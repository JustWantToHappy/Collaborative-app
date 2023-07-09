import {request} from '@/utils/request';
import type { Message } from '@/types';
import { State } from '@/enum';

export function getAllMessagesByState(state:State=State.Pending) {
  return request.get<Message[]>(`/message/${state}`);
}

export function updateMessage(id:string,data:Partial<Message>) {
  return request.patch<Message[]>(`/message/${id}`,data);
}

export function uploadImg(formData:FormData) {
  return request.post<string>('/message/uploadImg',formData,{ headers: { 'Content-Type': 'multipart/formdata' } });
}