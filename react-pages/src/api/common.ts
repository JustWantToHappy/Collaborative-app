import { User } from '@/types';
import {request} from '../utils/request';

export function register(user:User) {
  return request.post('/user',user);
}