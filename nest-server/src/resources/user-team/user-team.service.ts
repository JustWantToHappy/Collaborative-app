import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserTeamDto } from './dto/create-user-team.dto';
import { UpdateUserTeamDto } from './dto/update-user-team.dto';
import { UserTeam } from './entities/user-team.entity';

@Injectable()
export class UserTeamService {
  constructor(
    @InjectRepository(UserTeam)
    private readonly userTeamRepository: Repository<UserTeam>,
  ) {}

  async create(createUserTeamDto: CreateUserTeamDto) {
    const userTeam = await this.userTeamRepository.create(createUserTeamDto);
    return this.userTeamRepository.save(userTeam);
  }

  findAll() {
    return `This action returns all userTeam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTeam`;
  }

  update(id: number, updateUserTeamDto: UpdateUserTeamDto) {
    return `This action updates a #${id} userTeam`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTeam`;
  }
}
