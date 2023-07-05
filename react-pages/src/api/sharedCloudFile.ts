import { request} from '@/utils';

export function moveToSharedCloudFile(cloudFileId:string,collaborators:string[]) {
  return request.post('/sharedCloudFile/move',{cloudFileId,collaborators});
}
