import type { CloudFile} from './cloudFile';

export type SharedCloudFile = Omit<CloudFile, 'userId'> & {
  ownerId: string;
  collaborators: string;
}

export type EditPerson ={[x in 'name'|'email'|'avatar'|'color']:string}