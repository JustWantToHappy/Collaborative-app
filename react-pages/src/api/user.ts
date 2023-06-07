import { request } from '../utils';
import type {User } from '../types';

export function login(user:User) {
  const {email,password } = user;
  return request.post<User>('/user/login',{email,password});
}

