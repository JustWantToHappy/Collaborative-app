import { YesNotState } from 'src/common/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'tinyint', default: YesNotState.Not })
  iscare: number;

  @Column({ type: 'tinyint', default: YesNotState.Not })
  isagree: number;
}
