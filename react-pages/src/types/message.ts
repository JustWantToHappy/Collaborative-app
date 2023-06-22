import { MessageType, State } from '@/enum';

export type Message={
  id: string;
  name: string;
  avatar: string;
  thirdPartyId?: string;
  groupName?: string;
  groupAvatar?: string;
  type: MessageType
  state:State
}