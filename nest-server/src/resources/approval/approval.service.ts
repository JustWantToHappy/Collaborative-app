import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class ApprovalService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createApprovalDto: CreateApprovalDto & { startTime: Date; endTime: Date },
  ) {
    await this.prisma.approval.create({ data: createApprovalDto });
    return 'create success';
  }

  async findAll(query: PaginationQueryDto, userId: string) {
    const { current, pageSize } = query;
    const data = await this.prisma.approval.findMany({
      where: { userId },
      take: pageSize,
      skip: Math.min(current - 1, 1) * pageSize,
    });
    const total = await this.prisma.approval.count({ where: { userId } });
    return { total, approvals: data };
  }

  findOne(id: number) {
    return `This action returns a #${id} approval`;
  }

  update(id: number, updateApprovalDto: UpdateApprovalDto) {
    return `This action updates a #${id} approval`;
  }

  remove(id: number) {
    return `This action removes a #${id} approval`;
  }
}
