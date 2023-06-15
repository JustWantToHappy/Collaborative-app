import { request } from '@/utils/request';

export const myGroups = () => {
  return request.get('/group');
};

export const buildGroup = (team:FormData) => {
  return request.post('/group',team,{ headers: { 'Content-Type': 'multipart/formdata' } });
};

export const leaveGroup = (id:number) => {
  return request.delete(`/userTeam/${id}`);
};

export const applyJoinGroup = (name:string) => {
  return request.post('/group/apply',{name});
};