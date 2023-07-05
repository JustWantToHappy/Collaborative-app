import { IsArray, IsString } from 'class-validator';

export class MoveToSharedCloudFileDto {
  @IsString()
  cloudFileId: string;

  @IsArray()
  collaborators: string[];
}
