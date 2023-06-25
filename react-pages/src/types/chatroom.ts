import { FileType } from '@/enum';
import type { Group } from './group';
import type { Message } from './message';
import type { User } from './user';

export type ChatRoom = {
  id: string;
  userIds: string;
  type: string;
  User?: User,
  Group?: Group,
  Messages?:Message[]
}

export type ChatRecord = {
  id: string;
  name: string;
  avatar: string;
  senderId: string;
  receiverId: string;
  text: string;
  fileType: FileType;
  chatRoomId: string;
  createdAt: string;
}