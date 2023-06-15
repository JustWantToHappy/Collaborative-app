import { State } from '@/enum';
import type {Friend} from '@/types';
import {request} from '@/utils/request';

export function invitedInfo() {
  return request.get<Friend[]>('/friend/invited');
}

export function myFriends() {
  return request.get<Friend[]>('/friend');
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
