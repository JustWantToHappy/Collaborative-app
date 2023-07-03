import { request } from '@/utils';
import type { CloudFile } from '@/types';
import type { DataNode} from 'antd/es/tree';

export function addFolder(data:Partial<CloudFile>) {
  return request.post('/cloudFile',data);
}

//获取文件树结构
export function getFilesTree() {
  return request.get<DataNode[]>('/cloudFile');
}