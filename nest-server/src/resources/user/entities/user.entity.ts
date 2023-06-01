import { UserTeam } from 'src/resources/user-team/entities/user-team.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  /*
  如果没有创建中间表的实体可以通过这种方式建立表之间的关系
  @JoinTable({
    name: 'user_team',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'team_id', referencedColumnName: 'id' },
  })
  @ManyToMany(() => Team, (Team) => Team.users)
  teams: Team[];*/

  /* @OneToMany(() => UserTeam, (userTeam) => userTeam.user)
  userTeams: UserTeam[];*/
}
