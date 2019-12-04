import {PendingShift} from './pendingshift-model';
import {User} from './user-model';

export interface UserPendingShift {
  userId?: number;
  user?: User;
  pendingShiftId?: number;
  pendingShift?: PendingShift;

}
