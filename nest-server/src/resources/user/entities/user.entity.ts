import { Base } from 'src/common/base/base.entity';
import { Role } from 'src/common/enum';
import { Column, Entity } from 'typeorm';
@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column('simple-array')
  roles: Role[];
}
