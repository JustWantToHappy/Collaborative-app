import { Base } from 'src/common/base/base.entity';
import { Role } from 'src/common/enum';
import { Contact } from 'src/resources/contact/entities/contact.entity';
import { Column, Entity, OneToMany } from 'typeorm';
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

  @OneToMany(() => Contact, (contact) => contact.user)
  others: Contact[];

  @OneToMany(() => Contact, (contact) => contact.other)
  OthersOf: Contact[];
}
