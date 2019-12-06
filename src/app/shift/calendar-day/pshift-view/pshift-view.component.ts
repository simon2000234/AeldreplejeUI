import { Component, OnInit } from '@angular/core';
import {CalendarService} from '../../../shared/services/calendar.service';
import {PendingShift} from '../../../shared/models/pendingshift-model';
import {DatePipe} from '@angular/common';
import {PendingShiftService} from "../../../shared/services/pending-shift.service";
import {ShiftService} from "../../../shared/services/shift.service";
import {RouteService} from "../../../shared/services/route.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pshift-view',
  templateUrl: './pshift-view.component.html',
  styleUrls: ['./pshift-view.component.css']
})
export class PshiftViewComponent implements OnInit {

  PShifts: PendingShift[];
  chosenDate: Date;
  constructor(public cService: CalendarService,
              private pshiftService: PendingShiftService,
              private shiftService: ShiftService,
              private routeService: RouteService,
              private router: Router) { }

  ngOnInit() {
    this.PShifts = this.cService.getCalendarArray();
    this.chosenDate = this.cService.getCalendarDate();
  }

  Delete(pendingShift: PendingShift) {
    debugger;
    const shiftId = pendingShift.shift.id;
    const routeId = pendingShift.shift.route.id;
    this.pshiftService.deletePendingShift(pendingShift.id)
      .subscribe(() => {
        this.shiftService.deleteShift(shiftId)
          .subscribe(() => {
            this.router.navigateByUrl('/shift-overview');
          });
      });
  }

}
