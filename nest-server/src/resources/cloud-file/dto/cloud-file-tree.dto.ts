export class CloudFileTreeDto {
  key: string;
  title: string;
  isLeaf?: boolean;
  children?: CloudFileTreeDto[];
  type?: 'image' | 'cloudDocument'; //附加类型，用于判断文件类型
}
