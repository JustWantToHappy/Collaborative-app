import { request } from '@/utils';
import type { DataNode } from 'antd/es/tree';
import type { CloudFile} from '@/types';

//获取文件树结构
export function getCloudFilesTree() {
  return request.get<DataNode[]>('/cloudFile');
}

//获取单个文件夹下的内容
export function getCloudFolderContents(id: string) {
  return request.get<CloudFile[]|CloudFile>(`/cloudFile/${id}`);
}

//新建文件夹
export function addFolder(data:FormData) {
  return request.post('/cloudFile',data, { headers: { 'Content-Type': 'multipart/formdata' } });
}

export function updateCloudFile(id: string, data: Partial<CloudFile>) {
  return request.patch(`/cloudFile/${id}`,data);
}

//删除当前文件夹
export function deleteCloudFolder(id: string) {
  return request.delete(`/cloudFile/${id}`);
}