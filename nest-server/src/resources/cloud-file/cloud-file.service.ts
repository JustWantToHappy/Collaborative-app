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
        //叶子结点(不包含文件夹)
        if (file.children.length === 0 && files[i].type !== FileType.Folder) {
          file.isLeaf = true;
        }
      }
    }
  }

  //以列表的形式返回文件
  buildFilesList() {
    //
  }

  //所有文件夹以及子目录文件
  async getAllFiles(userId: string) {
    return this.prisma.cloudFile.findMany({
      where: { ownerId: userId, isshared: 0 },
    });
  }

  //返回文件树结构
  async findAll(userId: string) {
    const ans: CloudFileTreeDto[] = [];
    const files = await this.getAllFiles(userId);
    this.buildFilesTree(files, ans);
    return ans;
  }

  //返回当前文件夹下的内容或者当前文件内容
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
