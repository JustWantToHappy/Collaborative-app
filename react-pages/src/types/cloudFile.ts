import type { UploadFile } from 'antd/es/upload/interface';

export type CloudFile = {
  id: string;
  parentId: string;
  isshared: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  userId: string;
  file: UploadFile;
}