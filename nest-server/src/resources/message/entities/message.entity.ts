import { Dialog } from 'src/common/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conversation_id: number;

  @Column({ type: 'text', default: '' })
  text: string;

  @Column()
  image_id: number;

  @Column({ type: 'enum', enum: Dialog, default: Dialog.Text })
  type: Dialog;

  @Column()
  sender_id: number;

  @Column()
  recipient_id: number;
}
