import { State } from '@/enum';

export type Approval = {
  id: string;
  type: string;
  state:State
  startTime: Date;
  endTime: Date;
  reason: string;
}