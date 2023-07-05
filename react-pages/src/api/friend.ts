import { State } from '@/enum';
import {request} from '@/utils/request';
import type { Friend,Contact,TreeNode } from '@/types';

export function invitedInfo() {
  return request.get<Friend[]>('/friend/invited');
}

export function myjoins() {
  return request.get<Contact>('/friend');
}

export function addFriend(email:string) {
  return request.post('/friend',{email});
}


export function handleInvite(email:string,state:State) {
  return request.patch(`/friend`,{email,state});
}

export function deleteFriend(id:number) {
  return request.delete(`/friend/${id}`);
}

export function getAllContacts() {
  return request.get<TreeNode[]>('/friend/contact');
}