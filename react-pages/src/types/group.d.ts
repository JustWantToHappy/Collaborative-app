import type { Friend } from './friend';

export type Group = Partial<{
  id: number;
  leaderId: number;
  name: string;
  description: string;
  avatar: string;
  createdAt: string;
}>

export type Contact = { friends: Friend[], groups: Group[] }