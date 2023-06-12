import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Team } from '../team/entities/team.entity';
import { TeamService } from '../team/team.service';
import { CreateUserTeamDto } from './dto/create-user-team.dto';
import { UpdateUserTeamDto } from './dto/update-user-team.dto';
import { UserTeam } from './entities/user-team.entity';

@Injectable()
export class UserTeamService {
  constructor(
    @InjectRepository(UserTeam)
    private readonly userTeamRepository: Repository<UserTeam>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly dataSource: DataSource,
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
    return this.userTeamRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserTeamDto: UpdateUserTeamDto) {
    return `This action updates a #${id} userTeam`;
  }

  async remove(user_id: number, team_id: number) {
    const isLeader = await this.teamRepository.findOne({
      where: { id: team_id, leader_id: user_id },
    });
    //如果是群主退群，则该群解散
    if (isLeader) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const userTeams = await this.userTeamRepository.find({
          where: { team_id },
        });
        await queryRunner.manager.remove(userTeams);
        const team = await this.teamRepository.findOne({
          where: { id: team_id },
        });
        await queryRunner.manager.remove(team);
        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    } else {
      const userTeam = await this.userTeamRepository.findOne({
        where: { user_id, team_id },
      });
      return this.userTeamRepository.remove(userTeam);
    }
  }
}
