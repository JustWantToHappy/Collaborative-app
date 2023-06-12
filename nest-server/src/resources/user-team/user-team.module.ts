import { Module } from '@nestjs/common';
import { UserTeamService } from './user-team.service';
import { UserTeamController } from './user-team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeam } from './entities/user-team.entity';
import { Team } from '../team/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTeam, Team])],
  controllers: [UserTeamController],
  providers: [UserTeamService],
})
export class UserTeamModule {}
