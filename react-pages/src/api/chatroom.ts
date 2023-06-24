import { request } from '@/utils/request';
import type { ChatRoom,ChatRecord} from '@/types';

export function getAllChatRoom() {
  return request.get<ChatRoom[]>('/chatroom');
}

export function getChatRecordsByChatRoomId(id:string) {
  return request.get<ChatRecord[]>(`/chatroom/records/${id}`);
}
