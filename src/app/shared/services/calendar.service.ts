import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  calendarArray: any[];
  calendarDate: Date;
  constructor() { }

  getCalendarArray(): any[] {
    return this.calendarArray;
  }

  setCalendarArray(cArray: any[]): void {
    this.calendarArray = cArray;
  }

  getCalendarDate(): Date {
    return this.calendarDate;
  }

  setCalendarDate(cDate: Date): void {
    this.calendarDate = cDate;
  }
}
