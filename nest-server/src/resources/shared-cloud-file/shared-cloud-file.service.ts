import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SharedCloudFileTreeDto } from './dto/shared-cloud-file-tree.dto';
import { CreateSharedCloudFileDto } from './dto/create-shared-cloud-file.dto';
import { UpdateSharedCloudFileDto } from './dto/update-shared-cloud-file.dto';
import { MoveToSharedCloudFileDto } from './dto/moveTo-shared-cloud-file.dto';
import { CloudFileService } from '../cloud-file/cloud-file.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudFile, SharedCloudFile } from '@prisma/client';
import { deleteFile } from '../../common/utils';
import { FileType } from 'src/common/enum';
import { UserService } from '../user/user.service';

@Injectable()
export class SharedCloudFileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudFileService: CloudFileService,
    private readonly userService: UserService,
  ) {}

  create(createSharedCloudFileDto: CreateSharedCloudFileDto) {
    return 'This action adds a new sharedCloudFile';
  }

  //移动云文档中的文件到共享空间
  async moveToSharedCloudFile(
    userId: string,
    moveToSharedCloudFileDto: MoveToSharedCloudFileDto,
  ) {
    const ans: CloudFile[] = [];
    const root = await this.cloudFileService.findOne(
      moveToSharedCloudFileDto.cloudFileId,
    );
    //修改原来的文件的父级为根目录
    root.parentId = '0';
    ans.push(root);
    moveToSharedCloudFileDto.collaborators.push(userId);
    const files = await this.cloudFileService.findUserFiles(userId);
    this.cloudFileService.buildFilesList(
      files,
      ans,
      moveToSharedCloudFileDto.cloudFileId,
    );
    //事务:将文件从私人空间中移除，同时添加到共享空间
    this.prisma.$transaction([
      ...ans.map((cloudFile) =>
        this.prisma.cloudFile.delete({ where: { id: cloudFile.id } }),
      ),
      ...ans.map((cloudFile) => {
        delete cloudFile.userId;
        const sharedFile = Object.assign(cloudFile, {
          ownerId: userId,
          collaborators: moveToSharedCloudFileDto.collaborators.join(','),
        });
        return this.prisma.sharedCloudFile.create({ data: sharedFile });
      }),
    ]);
  }

  buildFilesTree(
    files: SharedCloudFile[],
    ans: SharedCloudFileTreeDto[],
    parentId = '0',
    set = new Set(),
  ) {
    for (let i = 0; i < files.length; i++) {
      if (!set.has(files[i].id) && files[i].parentId === parentId) {
        set.add(files[i].id);
        const file: SharedCloudFileTreeDto = {
          key: files[i].id,
          title: files[i].title,
        };
        if (files[i].type === FileType.Folder) {
          file.children = [];
          ans.push(file);
          this.buildFilesTree(files, file.children, file.key, set);
        } else {
          ans.push(file);
          file.isLeaf = true;
        }
      }
    }
  }

  buildFilesList(
    files: SharedCloudFile[],
    ans: SharedCloudFile[],
    parentId = '0',
    visited = new Set(),
  ) {
    for (let i = 0; i < files.length; i++) {
      if (!visited.has(files[i].id) && files[i].parentId === parentId) {
        visited.add(files[i].id);
        ans.push(files[i]);
        this.buildFilesList(files, ans, files[i].id, visited);
      }
    }
  }

  findUserFiles(userId: string) {
    return this.prisma.sharedCloudFile.findMany({
      where: { collaborators: { contains: userId } },
    });
  }

  findOne(id: string) {
    return this.prisma.sharedCloudFile.findUnique({ where: { id } });
  }

  async findAll(userId: string) {
    const ans: SharedCloudFileTreeDto[] = [];
    const files = await this.findUserFiles(userId);
    this.buildFilesTree(files, ans);
    ans.sort((a, b) => {
      if (a.children?.length > b.children?.length) {
        return -1;
      } else if (!a.isLeaf && b.isLeaf) {
        return -1;
      } else if (a.children?.length < b.children?.length) {
        return 1;
      } else if (a.isLeaf && !b.isLeaf) {
        return 1;
      }
      return 0;
    });
    return ans;
  }

  async findFolderAndFirstLevelFiles(id: string, userId: string) {
    const ans = [];
    const root = await this.findOne(id);
    if (root && root.type !== FileType.Folder) {
      return root;
    } else {
      const files = await this.findUserFiles(userId);
      for (let i = 0; i < files.length; i++) {
        if (files[i].parentId === id) {
          ans.push(files[i]);
        }
      }
    }
    return ans;
  }

  //文档中的所有协同者
  async findAllCollaboratorsById(id: string) {
    const sharedCloudFile = await this.findOne(id);
    const collaborators = sharedCloudFile.collaborators
      .split(',')
      .filter((userId) => userId !== sharedCloudFile.ownerId);
    collaborators.unshift(sharedCloudFile.ownerId);
    return Promise.all(
      collaborators.map(async (collaborator) => {
        const user = await this.userService.findOne(collaborator);
        return {
          id: user.id,
          email: user.email,
          avatar: user.avatar,
          name: user.name,
        };
      }),
    );
  }

  async update(id: string, updateSharedCloudFileDto: UpdateSharedCloudFileDto) {
    const sharedCloudFile = await this.findOne(id);
    if (!sharedCloudFile) {
      throw new HttpException('不存在此文档', HttpStatus.NOT_FOUND);
    }
    updateSharedCloudFileDto.updatedAt = new Date();
    updateSharedCloudFileDto.version = sharedCloudFile.version + 1;
    return this.prisma.sharedCloudFile.update({
      where: { id },
      data: updateSharedCloudFileDto,
    });
  }

  //删除文件夹下所有内容(只有文件拥有者才可以删除)
  async remove(id: string, userId: string) {
    const file = await this.findOne(id);
    if (file.ownerId !== userId) {
      throw new HttpException('权限不够', HttpStatus.FORBIDDEN);
    }
    const ans: SharedCloudFile[] = [];
    const root = await this.findOne(id);
    ans.push(root);
    const files = await this.findUserFiles(userId);
    this.buildFilesList(files, ans, id);
    ans.forEach((sharedCloudFile) => {
      if (
        sharedCloudFile.path !== '' &&
        sharedCloudFile.type === FileType.Image
      ) {
        deleteFile(sharedCloudFile.path);
      }
    });
    this.prisma.$transaction(
      ans.map((sharedCloudFile) =>
        this.prisma.sharedCloudFile.delete({
          where: { id: sharedCloudFile.id },
        }),
      ),
    );
  }
}
