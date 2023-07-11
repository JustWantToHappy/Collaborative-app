import { request } from '@/utils';
import type {SharedCloudFile } from '@/types';
import type { DataNode } from 'antd/es/tree';

export function getSharedCloudFilesTree() {
  return request.get<DataNode[]>('/sharedCloudFile');
}

export function getSharedCloudFolderContents(sharedCloudFileId:string) {
  return request.get<SharedCloudFile[]|SharedCloudFile>(`/sharedCloudFile/${sharedCloudFileId}`);
}

export function getAllCollaboratorsById(id:string) {
  return request.get(`/sharedCloudFile/collaborators/${id}`);
}

export function getSharedCloudFileVersion(id:string) {
  return request.get<number>(`/sharedCloudFile/version/${id}`);
}

export function moveToSharedCloudFile(cloudFileId:string,collaborators:string[]) {
  return request.post('/sharedCloudFile/move',{cloudFileId,collaborators});
}


export function updateSharedCloudFile(id: string,data:Partial<SharedCloudFile>) {
  return request.patch(`/sharedCloudFile/${id}`,data);
}

export function deleteSharedCloudFloder(sharedCloudFileId: string) {
  return request.delete(`/sharedCloudFile/${sharedCloudFileId}`);
}
