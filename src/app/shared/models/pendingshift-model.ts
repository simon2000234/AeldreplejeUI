import {Shift} from './shift-model';
import {User} from './user-model';

export interface PendingShift {
  id?: number;
  shift: Shift;
  users?: User[];
}
