import { Component, OnInit } from '@angular/core';
import {CalendarService} from '../../../shared/services/calendar.service';
import {PendingShift} from '../../../shared/models/pendingshift-model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-pshift-view',
  templateUrl: './pshift-view.component.html',
  styleUrls: ['./pshift-view.component.css']
})
export class PshiftViewComponent implements OnInit {

  PShifts: PendingShift[];
  chosenDate: Date;
  constructor(public cService: CalendarService) { }

  ngOnInit() {
    this.PShifts = this.cService.getCalendarArray();
    this.chosenDate = this.cService.getCalendarDate();
  }

}
