import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  team_id: number;
}
