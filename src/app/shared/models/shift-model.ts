import {User} from './user-model';
import {ShiftRoute} from './route-model';

export interface Shift {
  id?: number;
  date: Date;
  timeStart: Date;
  timeEnd: Date;
  route: ShiftRoute;
  activeRoute: boolean;
  user?: User;
}
