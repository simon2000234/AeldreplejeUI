import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Moment} from "moment";
import {PendingShift} from "../../shared/models/pendingshift-model";
import {PendingShiftService} from "../../shared/services/pending-shift.service";

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
  currentMonthDates: Date[]; // Contains all the dates of the current calendar page
  pendingShifts: PendingShift[];
  constructor(private psService: PendingShiftService) { }

  ngOnInit() {
    this.getMonth(this.currentTime);
    this.currentMonthSelected = this.currentTime.clone().toDate();
    /*this.psService.getPendingShifts()
      .subscribe(ps => this.pendingShifts = ps);*/
  }

  getMonth(time: Moment): void {
    const daysInMonth: number = time.daysInMonth();
    const weekModifier: number = (6 - (time.clone().date(time.daysInMonth()).day())) + (time.clone().date(1).day());
    const totalDays: number = daysInMonth + weekModifier;
    const firstDayOfMonth = time.clone().subtract(moment().date() - 1, 'days').day(0);

    const dates: any[] = [];
    for (let i = 0; i < totalDays; i++) {
      dates.push(firstDayOfMonth.clone().add(i, 'days').toDate());
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

}
