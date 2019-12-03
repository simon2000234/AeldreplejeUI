import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {PendingShift} from '../../shared/models/pendingshift-model';
import {PendingShiftService} from '../../shared/services/pending-shift.service';
import {CalendarDate} from '../../shared/models/calendar-date-model';
import {DatePShift} from '../../shared/models/date-pshift-model';
import {of} from 'rxjs';
import {CalendarService} from "../../shared/services/calendar.service";
import {Router} from "@angular/router";

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
  PShifts: PendingShift[] = [];
  constructor(private psService: PendingShiftService,
              public cService: CalendarService,
              private router: Router) { }

  ngOnInit() {
    this.currentMonthSelected = this.currentTime.clone().toDate();


    this.psService.getPendingShifts()
      .subscribe(ps => {
        this.PShifts = ps;
        for (const theDates of this.PShifts) {
          const date: DatePShift = {
            pendingShift: theDates,
            calendarDate: new Date(theDates.shift.date)
          };
          this.PShiftDates.push(date);
        }
        this.getMonth(this.currentTime);
      });
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
        pendingShifts: [] = [],
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

  clickAction(calendarDate: CalendarDate): void {
    this.cService.setCalendarArray(calendarDate.pendingShifts);
    this.cService.setCalendarDate(calendarDate.calendarDate);
    this.router.navigateByUrl('/pending-calendar-shift');
  }

}
