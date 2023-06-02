import { IsNumber, IsString } from 'class-validator';
import { Base } from 'src/common/base/base.entity';
import { YesNotState } from 'src/common/enum';

export class CreateKnowledgeBaseDto extends Base {
  @IsString()
  title: string;

  @IsNumber()
  user_id: number;

  @IsNumber()
  is_shared: YesNotState;

  is_deleted: YesNotState;
}
