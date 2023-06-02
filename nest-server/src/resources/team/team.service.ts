import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserTeamDto } from '../user-team/dto/create-user-team.dto';
import { UserTeamService } from '../user-team/user-team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    private readonly dataSource: DataSource,
    private readonly userTeamService: UserTeamService,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let newTeam;
    try {
      //通过repository创建一个实体对象
      const team = this.teamRepository.create(createTeamDto);
      const savedTeam = await queryRunner.manager.save(team);
      newTeam = await this.userTeamService.create({
        user_id: savedTeam.leader_id,
        team_id: savedTeam.id,
      } as CreateUserTeamDto);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return newTeam;
  }

  findAll() {
    return `This action returns all team`;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
