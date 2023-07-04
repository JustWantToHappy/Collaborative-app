import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCloudFileDto } from './dto/create-cloud-file.dto';
import { UpdateCloudFileDto } from './dto/update-cloud-file.dto';
import { CloudFileTreeDto } from './dto/cloud-file-tree.dto';
import { CloudFile } from '@prisma/client';

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

  //以树的形式返回文件
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
        if (file.children.length === 0) {
          //
        }
      }
    }
  }

  //以列表的形式返回文件
  buildFilesList() {
    //
  }

  //所有文件夹以及子目录文件
  async getAllFiles(ownerId: string) {
    return this.prisma.cloudFile.findMany({
      where: { ownerId, isshared: 0 },
    });
  }

  //返回文件树结构
  async findAll(userId: string) {
    const ans: CloudFileTreeDto[] = [];
    const root = await this.prisma.cloudFile.findUnique({ where: { id: '0' } });
    //技巧:在遍历文件时候，先创建一个根节点
    if (!root) {
      await this.create({
        id: '0',
        title: '根节点',
        description: '这是根节点',
        userId,
        parentId: 'root',
      });
    } else {
      await this.update('0', { userId });
    }
    const files = await this.getAllFiles(userId);
    this.buildFilesTree(files, ans);
    return ans;
  }

  async findOne(id: string, userId: string) {
    //const file=await this.prisma.cloudFile
    //const files = await this.getAllFiles(userId);
    this.buildFilesList();
    return [];
  }

  update(id: string, updateCloudFileDto: UpdateCloudFileDto) {
    return this.prisma.cloudFile.update({
      data: updateCloudFileDto,
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} cloudFile`;
  }
}
