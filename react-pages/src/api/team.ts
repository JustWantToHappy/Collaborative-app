import { request } from '@/utils/request';

export const myGroups = () => {
  return request.get('/team');
};

export const buildGroup = (team:FormData) => {
  return request.post('/team',team,{ headers: { 'Content-Type': 'multipart/formdata' } });
};
