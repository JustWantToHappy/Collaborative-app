import type {Team } from '@/types';
import { request } from '@/utils/request';

export const buildGroup = (team:Team) => {
  return request.post('/team',team);
};