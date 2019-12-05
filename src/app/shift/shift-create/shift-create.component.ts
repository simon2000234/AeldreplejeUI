import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ShiftRoute} from '../../shared/models/route-model';
import {User} from '../../shared/models/user-model';
import {Router} from '@angular/router';
import {ShiftService} from '../../shared/services/shift.service';
import {RouteService} from '../../shared/services/route.service';
import {PendingShiftService} from '../../shared/services/pending-shift.service';
import {Shift} from '../../shared/models/shift-model';
import {PendingShift} from '../../shared/models/pendingshift-model';
import * as moment from 'moment';
import {CalendarService} from "../../shared/services/calendar.service";

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.css']
})
export class ShiftCreateComponent implements OnInit {

  startTimes: any = ['15:00', '15:30', '16:00', '16:30'];
  endTimes: any = ['23:00'];
  tempRoutes: any = ['MA01', 'MA02', 'MA03', 'MA28', 'MA29', 'MA30'];
  currentDate: Date;
  shiftForm = this.fb.group({
    date: [''],
    timeStart: [''],
    timeEnd: [''],
    route: ['']
  });
  constructor(private fb: FormBuilder,
              private router: Router,
              private shiftService: ShiftService,
              private routeService: RouteService,
              private pShiftService: PendingShiftService,
              public cService: CalendarService
              ) { }

  ngOnInit() {
    this.currentDate = this.cService.getCalendarDate();
    this.shiftForm.controls.date.setValue(this.currentDate.toISOString().substring(0, 10));
  }

  changeStart(e) {
    console.log(e.target.value);
    this.shiftForm.get('timeStart').setValue(e.target.value, {
      onlySelf: true
    });
  }
  changeEnd(e) {
    console.log(e.target.value);
    this.shiftForm.get('timeEnd').setValue(e.target.value, {
      onlySelf: true
    });
  }
  changeRoute(e) {
    console.log(e.target.value);
    this.shiftForm.get('route').setValue(e.target.value, {
      onlySelf: true
    });
  }

  save() {
    const shiftFromFields = this.shiftForm.value;
    const routeNameFix = shiftFromFields.route.indexOf('M');
    let shiftRoute: ShiftRoute = {name: shiftFromFields.route.substr(routeNameFix)};

    this.routeService.addShiftRoute(shiftRoute)
      .subscribe(sr => {
        shiftRoute = sr;
        let shiftToCreate: Shift = {
          date: new Date(shiftFromFields.date),
          timeStart: new Date(moment(shiftFromFields.date)
            .hours(shiftFromFields.timeStart.substr(3, 2))
            .add(1, 'hours')
            .minutes(shiftFromFields.timeStart.substr(6, 2))
            .seconds(0)
            .toDate()),
          timeEnd: new Date(moment(shiftFromFields.date)
            .hours(shiftFromFields.timeEnd.substr(3, 2))
            .add(1, 'hours')
            .minutes(shiftFromFields.timeEnd.substr(6, 2))
            .seconds(0)
            .toDate()),
          route: {id: shiftRoute.id}
        };
        this.shiftService.addShift(shiftToCreate)
          .subscribe(stc => {
            shiftToCreate = stc;
            const pShiftToCreate: PendingShift = {
              shift: {id: shiftToCreate.id}
            };
            this.pShiftService.addPendingShift(pShiftToCreate)
              .subscribe(() => {
                this.router.navigateByUrl('/shift-overview');
              });
          });
      });
  }

}
