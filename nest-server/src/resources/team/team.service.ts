import {
  ForbiddenException,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YesNotState } from 'src/common/enum';
import { InviteUserJoinGroup } from 'src/common/types';
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

  //同时将创建者加入到中间表中
  async create(createTeamDto: CreateTeamDto) {
    const team = await this.findByName(createTeamDto.name);
    if (team.length > 0) {
      throw new ConflictException(
        `群名称${createTeamDto.name}已被占用，请重新创建`,
      );
    }
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
        isagree: 1,
      } as CreateUserTeamDto);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return newTeam;
  }

  async joinTeam(info: InviteUserJoinGroup) {
    const { leader_id, team_id, user_id } = info;
    await this.findByLeaderId(leader_id, team_id);
    const joinInfo = { user_id, team_id };
    return this.userTeamService.create(joinInfo as CreateUserTeamDto);
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

  async findByLeaderId(leader_id: number, team_id: number) {
    const team = await this.teamRepository.findOne({
      where: { leader_id, id: team_id },
    });
    if (!team) {
      throw new ForbiddenException(
        `user ${leader_id} is not a group ${team_id}'sleader`,
      );
    }
    return team;
  }

  findByName(name: string) {
    return this.teamRepository.find({ where: { name } });
  }
}
