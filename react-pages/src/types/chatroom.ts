import type { Group } from './group';
import type { User } from './user';

export type ChatRoom = {
  id: string;
  userIds: string;
  type: string;
  User?: User,
  Group?:Group
}