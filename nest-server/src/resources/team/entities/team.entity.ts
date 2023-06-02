import { Base } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Team extends Base {
  @Column()
  leader_id: number;
  //如果是string类型，可以不设置length:255,默认值就是255
  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 255 })
  avatar: string;
}
