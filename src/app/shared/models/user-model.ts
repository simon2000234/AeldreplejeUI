import {Group} from './group-model';
import {Shift} from './shift-model';

export interface User {
  id: number;
  name?: string;
  Role?: string;
  email?: string;
  group?: Group;
  profilePicture?: string;
  shifts?: Shift[];

}
