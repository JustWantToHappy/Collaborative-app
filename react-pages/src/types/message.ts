import { MessageType } from '@/enum';

export type Message={
  name: string;
  avatar: string;
  thirdPartyId?: string;
  type:MessageType
}