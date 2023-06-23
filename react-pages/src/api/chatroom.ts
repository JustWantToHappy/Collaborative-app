import { request } from '@/utils/request';
import type { ChatRoom} from '@/types';

export function getAllChatRoom() {
  return request.get<ChatRoom[]>('/chatroom');
}