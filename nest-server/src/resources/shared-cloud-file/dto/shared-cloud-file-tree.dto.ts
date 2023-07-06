export class SharedCloudFileTreeDto {
  key: string;
  title: string;
  isLeaf?: boolean;
  children?: SharedCloudFileTreeDto[];
}
