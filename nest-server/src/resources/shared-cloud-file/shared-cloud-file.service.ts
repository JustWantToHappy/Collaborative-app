import { Injectable } from '@nestjs/common';
import { CreateSharedCloudFileDto } from './dto/create-shared-cloud-file.dto';
import { UpdateSharedCloudFileDto } from './dto/update-shared-cloud-file.dto';
import { MoveToSharedCloudFileDto } from './dto/moveTo-shared-cloud-file.dto';
import { CloudFileService } from '../cloud-file/cloud-file.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudFile, SharedCloudFile } from '@prisma/client';

@Injectable()
export class SharedCloudFileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudFileService: CloudFileService,
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
        const sharedFile: SharedCloudFile = Object.assign(cloudFile, {
          ownerId: userId,
          collaborators: moveToSharedCloudFileDto.collaborators.join(','),
        });
        return this.prisma.sharedCloudFile.create({ data: sharedFile });
      }),
    ]);
  }

  findAll() {
    return `This action returns all sharedCloudFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sharedCloudFile`;
  }

  update(id: number, updateSharedCloudFileDto: UpdateSharedCloudFileDto) {
    return `This action updates a #${id} sharedCloudFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} sharedCloudFile`;
  }
}
