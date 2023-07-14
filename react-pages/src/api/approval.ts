import { request } from '@/utils';
import type {Approval } from '@/types';


export function getAllApprovals() {
  return request.get('/approval');
}
export function applyApproval(body:Partial<Approval>) {
  return request.post('/approval',body);
}