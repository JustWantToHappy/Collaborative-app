import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { UserTeamService } from '../user-team/user-team.service';
import { UserTeam } from '../user-team/entities/user-team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, UserTeam])],
  controllers: [TeamController],
  providers: [TeamService, UserTeamService],
})
export class TeamModule {}
