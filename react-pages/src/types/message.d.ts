import { MessageType, State } from '@/enum';

export type Message={
  id: string;
  text?: string;
  createdAt: string;
  updateAt: string;
  type: MessageType;
  fileType: 'text'|'image';
  isread: 0|1;
  name: string;
  avatar: string;
  thirdPartyId?: string;
  groupName?: string;
  groupAvatar?: string;
  state: State
  chatRoomId?: string;
}