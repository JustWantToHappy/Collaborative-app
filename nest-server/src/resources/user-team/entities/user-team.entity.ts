import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserTeam {
  @PrimaryGeneratedColumn()
  id: number;

  //@ManyToOne(() => User)
  //@JoinColumn({ name: 'user_id' })
  @Column()
  user_id: number;

  //@ManyToOne(() => Team)
  //@JoinColumn({ name: 'team_id' })
  @Column()
  team_id: number;
}
