import {Group} from './group-model';
import {Shift} from './shift-model';
import {PendingShift} from "./pendingshift-model";
import {UserPendingShift} from "./user-pending-shift-model";

export interface User {
  id: number;
  name?: string;
  Role?: string;
  email?: string;
  group?: Group;
  profilePicture?: string;
  shifts?: UserPendingShift[];

}
