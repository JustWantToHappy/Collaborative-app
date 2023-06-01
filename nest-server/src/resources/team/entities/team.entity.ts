import { UserTeam } from 'src/resources/user-team/entities/user-team.entity';
import { User } from 'src/resources/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  leader_id: number;
  //如果是string类型，可以不设置length:255,默认值就是255
  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 255 })
  avatar: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  /*
 如果没有创建中间表的实体可以通过这种方式建立表之间的关系
  @ManyToMany(() => User, (User) => User.teams)
  users: User[];*/

  /*@OneToMany(() => UserTeam, (userTeam) => userTeam.team)
  userTeams: UserTeam[];*/
}
