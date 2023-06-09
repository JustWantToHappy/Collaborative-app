import { YesNotState } from 'src/common/enum';
import { User } from 'src/resources/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../../../common/base/base.entity';

@Entity()
export class Contact extends Base {
  @Column()
  user_id: number;

  @Column()
  other_id: number;

  @Column({ type: 'tinyint', default: YesNotState.Not })
  iscare: number;

  @Column({ type: 'tinyint', default: YesNotState.Not })
  isagree: number;

  @ManyToOne(() => User, (user) => user.others)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, (user) => user.OthersOf)
  @JoinColumn({ name: 'other_id' })
  other: User;
}
