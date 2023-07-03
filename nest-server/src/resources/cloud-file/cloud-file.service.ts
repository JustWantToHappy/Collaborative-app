import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCloudFileDto } from './dto/create-cloud-file.dto';
import { UpdateCloudFileDto } from './dto/update-cloud-file.dto';
import { CloudFileTreeDto } from './dto/cloud-file-tree.dto';
import { Prisma, Image, CloudDocument, CloudFile } from '@prisma/client';

type FoldeType = Prisma.CloudFileGetPayload<{
  include: {
    Images: true;
    CloudDocuments: true;
  };
}>;

type FileType = Image | CloudDocument | CloudFile;

@Injectable()
export class CloudFileService {
  constructor(private readonly prisma: PrismaService) {}

  //创建文件夹
  create(createCloudFileDto: CreateCloudFileDto) {
    return this.prisma.cloudFile.create({ data: createCloudFileDto });
  }

  addImagesToTree(ans: CloudFileTreeDto[], images: Image[]) {
    images.forEach((image) =>
      ans.push({
        key: image.id,
        title: image.title,
        isLeaf: true,
        type: 'image',
      }),
    );
  }

  addDocumentsToTree(ans: CloudFileTreeDto[], cloudDocuments: CloudDocument[]) {
    cloudDocuments.forEach((cloudDocument) =>
      ans.push({
        key: cloudDocument.id,
        title: cloudDocument.title,
        isLeaf: true,
        type: 'cloudDocument',
      }),
    );
  }

  //以树的形式返回文件
  buildFilesTree(
    files: FoldeType[],
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
        //加入当前文件夹下的子文件
        this.addImagesToTree(file.children, files[i].Images);
        this.addDocumentsToTree(file.children, files[i].CloudDocuments);
      }
    }
  }

  //以列表的形式返回文件
  buildFilesList() {
    //
  }

  //所有文件夹以及子目录文件
  async getAllFiles(userId: string): Promise<FoldeType[]> {
    return this.prisma.cloudFile.findMany({
      where: { userId },
      include: { Images: true, CloudDocuments: true },
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
    //将根目录下的文件加入
    const rootFolder = files.find((file) => file.id === '0');
    this.addImagesToTree(ans, rootFolder.Images);
    this.addDocumentsToTree(ans, rootFolder.CloudDocuments);
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
