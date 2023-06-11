import {request} from '@/utils';

export function uploadImg() {
  return request.post('/chat/uploadImg');
}