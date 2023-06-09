import { request } from '../utils';
import type {User } from '../types';

export function register(user:User) {
  return request.post('/user',user);
}

export function login(user:User) {
  const {email,password } = user;
  return request.post<User>('/user/login',{email,password});
}  

export function addFriend(email:string) {
  return request.post('/user/invite',{email});
}