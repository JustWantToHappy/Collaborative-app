import { YesNotState } from 'src/common/enum';
import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/base/base.entity';

@Entity()
export class Chat extends Base {
  @Column()
  team_id: number;

  @Column()
  from_user_id: number;

  @Column()
  to_user_id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'tinyint', default: YesNotState.Not })
  type: number;

  @Column({ type: 'tinyint', default: YesNotState.Not })
  isread: number;
}
