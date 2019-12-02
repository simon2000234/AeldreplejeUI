import {PendingShift} from "./pendingshift-model";

export interface CalendarDate {
  isEmpty: boolean;
  calendarDate: Date;
  pendingShifts?: PendingShift[];
}
