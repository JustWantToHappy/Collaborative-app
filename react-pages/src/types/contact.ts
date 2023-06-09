import { YesNotState } from '@/enum';

export type InviteInfo = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  isagree: YesNotState;
  iscare?: YesNotState;
}