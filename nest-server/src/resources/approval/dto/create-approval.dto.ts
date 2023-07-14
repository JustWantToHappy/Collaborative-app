import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateApprovalDto {
  @IsString()
  type: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  userId: string;
}
