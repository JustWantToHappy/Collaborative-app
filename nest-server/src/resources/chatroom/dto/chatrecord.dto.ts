import { FileType } from 'src/common/enum';

export class ChatrecordDto {
  name: string;
  avatar: string;
  senderId: string;
  receiverId: string;
  text: string;
  fileType: FileType;
  chatRoomId: string;
  createdAt: Date;
}
