import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name', 'type']) //建立复合索引
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Index() //开启数据库索引
  @Column()
  type: string;

  @Column('json')
  payload: Record<string, any>;
}
