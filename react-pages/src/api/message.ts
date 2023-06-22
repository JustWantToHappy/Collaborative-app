import {request} from '@/utils/request';
import type { Message } from '@/types';

export function getAllPendingMessages() {
  return request.get<Message[]>('/message');
}

export function updateMessage(id:string,data:Partial<Message>) {
  return request.patch<Message[]>(`/message/${id}`,data);
}