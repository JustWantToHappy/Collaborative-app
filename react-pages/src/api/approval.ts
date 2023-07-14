import { request } from '@/utils';
import type {Approval } from '@/types';

export function getAllApprovals(query?:{current:number,pageSize:number}) {
  const {current,pageSize } = query??{};
  return request.get<{total:number,approvals:Approval[]}>(`/approval?current=${current}&pageSize=${pageSize}`);
}

export function applyApproval(body:Partial<Approval>) {
  return request.post('/approval',body);
}