export class CloudFileTreeDto {
  key: string;
  title: string;
  isLeaf?: boolean;
  children?: CloudFileTreeDto[];
}
