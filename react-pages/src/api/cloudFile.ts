import { request } from '@/utils';
import type { CloudFile } from '@/types';
import type {TreeNode } from '../pages/Client/CloudFile';

//新建文件夹
export function addFolder(data:Partial<CloudFile>) {
  return request.post('/cloudFile',data);
}

//获取文件树结构
export function getFilesTree() {
  return request.get<TreeNode[]>('/cloudFile');
}

//获取单个文件夹下的内容
export function getFolderContents(id: string) {
  return request.get(`/cloudFile/${id}`);
}