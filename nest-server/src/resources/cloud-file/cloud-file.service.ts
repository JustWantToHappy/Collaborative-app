import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCloudFileDto } from './dto/create-cloud-file.dto';
import { UpdateCloudFileDto } from './dto/update-cloud-file.dto';
import { CloudFileTreeDto } from './dto/cloud-file-tree.dto';
import { CloudFile } from '@prisma/client';
import { FileType } from 'src/common/enum';

/*type FoldeType = Prisma.CloudFileGetPayload<{
  include: {
    Images: true;
    CloudDocuments: true;
  };
}>;*/

@Injectable()
export class CloudFileService {
  constructor(private readonly prisma: PrismaService) {}

  //创建文件夹
  create(createCloudFileDto: CreateCloudFileDto) {
    return this.prisma.cloudFile.create({ data: createCloudFileDto });
  }

  //以树的形式返回文件结构
  buildFilesTree(
    files: CloudFile[],
    ans: CloudFileTreeDto[],
    parentId = '0',
    visited = new Set(), //判断某个文件是否遍历过
  ) {
    for (let i = 0; i < files.length; i++) {
      if (!visited.has(files[i].id) && files[i].parentId === parentId) {
        visited.add(files[i].id);
        const file: CloudFileTreeDto = {
          key: files[i].id,
          title: files[i].title,
          children: [],
        };
        ans.push(file);
        this.buildFilesTree(files, file.children, files[i].id, visited);
        //叶子结点(也就是有文件后缀名的形式)
        if (file.children.length === 0 && files[i].type !== FileType.Folder) {
          file.isLeaf = true;
        }
      }
    }
  }

  //以列表的形式返回文件结构
  buildFilesList(
    files: CloudFile[],
    ans: CloudFile[],
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

  async findOne(id: string) {
    const file = await this.prisma.cloudFile.findUnique({ where: { id } });
    if (!file) {
      throw new HttpException('文件不存在', HttpStatus.NOT_FOUND);
    }
    return file;
  }

  //所有文件夹以及子目录文件
  findUserFiles(userId: string) {
    return this.prisma.cloudFile.findMany({
      where: { userId },
    });
  }

  //返回文件树结构
  async findAll(userId: string) {
    const ans: CloudFileTreeDto[] = [];
    const files = await this.findUserFiles(userId);
    this.buildFilesTree(files, ans);
    return ans;
  }

  //返回当前文件夹下的第一级内容或者当前文件内容
  async findFolderAndFirstLevelFiles(id: string, userId: string) {
    const ans = [];
    const root = await this.findOne(id);
    if (root.type === FileType.Image) {
      ans.push(root);
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

  update(id: string, updateCloudFileDto: UpdateCloudFileDto) {
    return this.prisma.cloudFile.update({
      data: updateCloudFileDto,
      where: { id },
    });
  }

  //删除文件夹以及文件夹下的所有文件
  async remove(id: string, userId: string) {
    const ans: CloudFile[] = [];
    const root = await this.findOne(id);
    ans.push(root);
    const files = await this.findUserFiles(userId);
    this.buildFilesList(files, ans, id);
    this.prisma.$transaction(
      ans.map((cloudFile) =>
        this.prisma.cloudFile.delete({ where: { id: cloudFile.id } }),
      ),
    );
  }
}
