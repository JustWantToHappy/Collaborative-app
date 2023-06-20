import { request } from '@/utils/request';

export const myGroups = () => {
  return request.get('/group');
};

export const buildGroup = (team:FormData) => {
  return request.post('/group',team,{ headers: { 'Content-Type': 'multipart/formdata' } });
};

export const applyJoinGroup = (name:string) => {
  return request.post<string>('/group/apply',{name});
};