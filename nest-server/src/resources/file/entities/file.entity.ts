import { YesNotState } from 'src/common/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  user_id: number;

  @Column()
  parent_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @Column({ type: 'tinyint', width: 1, default: YesNotState.Not })
  is_deleted: number;
}
