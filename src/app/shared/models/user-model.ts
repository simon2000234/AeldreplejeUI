import {Group} from './group-model';
import {Shift} from './shift-model';
import {UserPendingShift} from './user-pending-shift-model';

export interface User {
  id?: number;
  password?: string;
  name?: string;
  isAdmin?: boolean;
  email?: string;
  group?: Group;
  profilePicture?: string;
  shifts?: Shift[];
  pShifts?: UserPendingShift[];

}
