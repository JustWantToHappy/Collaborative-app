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

  findAll(id: number) {
    const query = `select user_team.id,team.name,team.avatar,team.description 
    from user inner join user_team on user_id=user.id
    inner join team on team_id=team.id where user.id=?`;
    return this.userTeamRepository.query(query, [id]);
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
