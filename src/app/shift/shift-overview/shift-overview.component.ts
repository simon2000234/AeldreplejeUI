import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {PendingShift} from '../../shared/models/pendingshift-model';
import {PendingShiftService} from '../../shared/services/pending-shift.service';
import {CalendarDate} from '../../shared/models/calendar-date-model';
import {DatePShift} from '../../shared/models/date-pshift-model';
import {of} from 'rxjs';

@Component({
  selector: 'app-shift-overview',
  templateUrl: './shift-overview.component.html',
  styleUrls: ['./shift-overview.component.css']
})
export class ShiftOverviewComponent implements OnInit {


  currentTime: Moment = moment(); // Used as base to create the calendar pages
  now: Date = moment().toDate(); // Used to highlight today's date
  currentMonthIndex: number = moment().month(); // Tracking month index when going back and forth using prev/next month
  currentMonthSelected: Date; // Used to check the currently selected month for styling the calendar
  yearMonth: string = this.currentTime.format('MMMM YYYY'); // Used to show Month and Year and a readable format
  currentMonthDates: CalendarDate[]; // Contains all the dates of the current calendar page
  PShiftDates: DatePShift[] = [];
  psdates: any[] = [];
  constructor(private psService: PendingShiftService) { }

  ngOnInit() {
    this.currentMonthSelected = this.currentTime.clone().toDate();
    const psd: DatePShift = {
      calendarDate: moment().clone().date(1).toDate(),
      pendingShift: {id: 1, shift: null, users: null}
    };
    this.PShiftDates.push(psd);
    const psd2: DatePShift = {
      calendarDate: moment().clone().toDate(),
      pendingShift: {id: 2, shift: null, users: null}
    };
    this.PShiftDates.push(psd2);
    const psd3: DatePShift = {
      calendarDate: moment().clone().date(0).toDate(),
      pendingShift: {id: 3, shift: null, users: null}
    };
    this.PShiftDates.push(psd3);
    const psd4: DatePShift = {
      calendarDate: moment().clone().date(1).toDate(),
      pendingShift: {id: 4, shift: null, users: null}
    };
    this.PShiftDates.push(psd4);
    this.psService.getPendingShifts()
      .subscribe(ps => {
        for (const shift of ps) {
          const pshiftDate: DatePShift = {
            calendarDate: shift.shift.date,
            pendingShift: {
              users: shift.users,
              shift: shift.shift,
              id: shift.id
            }
          };
          this.PShiftDates.push(pshiftDate);
        }
      });
    this.getMonth(this.currentTime);
  }

  getMonth(time: Moment): void {
    const daysInMonth: number = time.daysInMonth();
    const weekModifier: number = (6 - (time.clone().date(time.daysInMonth()).day())) + (time.clone().date(1).day());
    const totalDays: number = daysInMonth + weekModifier;
    const firstDayOfMonth = time.clone().subtract(moment().date() - 1, 'days').day(0);

    const dates: CalendarDate[] = [];
    for (let i = 0; i < totalDays; i++) {
      const tempDate: CalendarDate = {
        calendarDate: firstDayOfMonth.clone().add(i, 'days').toDate(),
        pendingShifts: [],
        isEmpty: true
      };
      for (const cd of this.PShiftDates) {
        if (tempDate.calendarDate.toDateString() === cd.calendarDate.toDateString()) {
          tempDate.pendingShifts.push(cd.pendingShift);
          tempDate.isEmpty = false;
        }
      }
      dates.push(tempDate);
    }
    this.currentMonthDates = dates;
  }

  checkDate(date: CalendarDate): CalendarDate {
    let tempDate: CalendarDate = date;
    for (const cd of this.PShiftDates) {
      if (tempDate.calendarDate.toISOString() === cd.calendarDate.toISOString()) {
        tempDate.pendingShifts.push(cd.pendingShift);
        tempDate = null;
      } else {
        tempDate = null;
      }
    }
    return tempDate;
  }

  nextMonth(): void {
    this.currentMonthIndex++;
    this.currentTime = moment().month(this.currentMonthIndex);
    this.yearMonth = this.currentTime.format('MMMM YYYY');
    this.currentMonthSelected = this.currentTime.clone().toDate();
    this.getMonth(this.currentTime);
  }
  prevMonth(): void {
    this.currentMonthIndex--;
    this.currentTime = moment().month(this.currentMonthIndex);
    this.yearMonth = this.currentTime.format('MMMM YYYY');
    this.currentMonthSelected = this.currentTime.clone().toDate();
    this.getMonth(this.currentTime);
  }

}
