import {Shift} from './shift-model';
import {User} from './user-model';
import {UserPendingShift} from './user-pending-shift-model';

export interface PendingShift {
  id?: number;
  shift?: Shift;
  shiftId?: number;
  users?: UserPendingShift[];
}
