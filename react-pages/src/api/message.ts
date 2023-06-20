import { Message } from '@/types';
import {request} from '@/utils/request';

export function getAllPendingMessages() {
  return request.get<Message[]>('/message');
}

