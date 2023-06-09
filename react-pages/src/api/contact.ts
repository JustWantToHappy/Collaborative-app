import { YesNotState } from '@/enum';
import type {InviteInfo} from '@/types';
import {request} from '@/utils/request';

export function addFriend(email:string) {
  return request.post('/contact/invite',{email});
}

export function invitedInfo() {
  return request.get<InviteInfo[]>('/contact/invitedInfo');
}

export function handleInvite(id:number,state:YesNotState) {
  return request.patch(`/contact/${id}`,{isagree:state});
}

export function deleteInviteInfo(id:number) {
  return request.delete(`/contact/${id}`);
}

