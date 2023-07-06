import type { CloudFile} from './cloudFile';

export type SharedCloudFile = Omit<CloudFile, 'userId'> & {
  ownerId: string;
  collaborators: string;
}