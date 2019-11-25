import {Shift} from './shift-model';
import {User} from './user-model';

export interface Pedingshift {
  id: number;
  shift: Shift;
  users: User[];
}
