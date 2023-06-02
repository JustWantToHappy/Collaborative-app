import { YesNotState } from 'src/common/enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class KnowledgeBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  user_id: number;

  @Column({ type: 'tinyint', default: YesNotState.Not })
  is_shared: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'tinyint', default: YesNotState.Not })
  is_deleted: number;
}
