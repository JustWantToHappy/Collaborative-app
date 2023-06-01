import { PartialType } from '@nestjs/swagger';
import { CreateUserTeamDto } from './create-user-team.dto';

export class UpdateUserTeamDto extends PartialType(CreateUserTeamDto) {}
