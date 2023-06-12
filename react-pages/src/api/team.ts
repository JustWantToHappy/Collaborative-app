import { request } from '@/utils/request';

export const myGroups = () => {
  return request.get('/userTeam');
};

export const buildGroup = (team:FormData) => {
  return request.post('/team',team,{ headers: { 'Content-Type': 'multipart/formdata' } });
};

export const leaveGroup = (id:number) => {
  return request.delete(`/userTeam/${id}`);
};