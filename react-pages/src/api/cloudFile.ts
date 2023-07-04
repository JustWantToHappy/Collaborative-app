import { request } from '@/utils';
import { DataNode } from 'antd/es/tree';

//新建文件夹
export function addFolder(data:FormData) {
  return request.post('/cloudFile',data, { headers: { 'Content-Type': 'multipart/formdata' } });
}

//获取文件树结构
export function getFilesTree() {
  return request.get<DataNode[]>('/cloudFile');
}

//获取单个文件夹下的内容
export function getFolderContents(id: string) {
  return request.get(`/cloudFile/${id}`);
}

//删除当前文件夹
export function deleteFolder(id: string) {
  return request.delete(`/cloudFile/${id}`);
}