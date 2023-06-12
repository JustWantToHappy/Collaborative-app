import { request } from '../utils';
import type {User } from '../types';

export function register(user:User) {
  return request.post('/user',user);
}

export function login(user:User) {
  const {email,password } = user;
  return request.post<User>('/user/login',{email,password});
}  

export function updateInfo(formData:FormData) {
  return request.patch<User>('/user', formData, { headers: { 'Content-Type': 'multipart/formdata' } });
}