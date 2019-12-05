import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ShiftService} from '../../shared/services/shift.service';
import {RouteService} from '../../shared/services/route.service';
import {PendingShiftService} from '../../shared/services/pending-shift.service';
import {ShiftRoute} from '../../shared/models/route-model';
import {Shift} from '../../shared/models/shift-model';
import {PendingShift} from '../../shared/models/pendingshift-model';
import {CalendarService} from "../../shared/services/calendar.service";
import * as moment from "moment";

@Component({
  selector: 'app-shift-update',
  templateUrl: './shift-update.component.html',
  styleUrls: ['./shift-update.component.css']
})
export class ShiftUpdateComponent implements OnInit {

  startTimes: any = ['15:00', '15:30', '16:00', '16:30'];
  endTimes: any = ['23:00'];
  tempRoutes: any = ['MA01', 'MA02', 'MA03', 'MA28', 'MA29', 'MA30'];
  shiftForm = this.fb.group({
    date: [''],
    timeStart: [''],
    timeEnd: [''],
    route: ['']
  });
  currentDate: Date;
  id: number;
  currentPShift: PendingShift;
  currentRoute: ShiftRoute;
  currentShift: Shift;
  constructor(private fb: FormBuilder,
              private router: Router,
              private shiftService: ShiftService,
              private routeService: RouteService,
              private pShiftService: PendingShiftService,
              public cService: CalendarService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentDate = this.cService.getCalendarDate();
    this.id = +this.route.snapshot.paramMap.get('id');
    this.pShiftService.getPendingShift(this.id)
      .subscribe(pshiftFromRest => {
        this.currentPShift = pshiftFromRest;
        this.currentRoute = pshiftFromRest.shift.route;
        this.currentShift = pshiftFromRest.shift;
        this.shiftForm.controls.date.setValue(this.currentDate.toISOString().substring(0, 10));
        this.patchTime();
        this.shiftForm.controls.route.setValue(this.currentRoute.name);
        /*this.shiftForm.patchValue({
          route: pshiftFromRest.shift.route.name
            });*/
      });
  }
  changeStart(e) {
    console.log(e.target.value);
    this.shiftForm.get('timeStart').setValue(e.target.value.substr(3), {
      onlySelf: true
    });
  }
  changeEnd(e) {
    console.log(e.target.value);
    this.shiftForm.get('timeEnd').setValue(e.target.value.substr(3), {
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
    let shiftRoute: ShiftRoute = {
      id: this.currentRoute.id,
      name: shiftFromFields.route.substr(routeNameFix)};

    this.routeService.updateShiftRoute(shiftRoute)
      .subscribe(sr => {
        shiftRoute = sr;
        let shiftToUpdate: Shift = {
          id: this.currentShift.id,
          date: new Date(shiftFromFields.date),
          timeStart: new Date(moment(shiftFromFields.date)
            .hours(shiftFromFields.timeStart.substr(0, 2))
            .add(1, 'hours')
            .minutes(shiftFromFields.timeStart.substr(3, 2))
            .seconds(0)
            .toDate()),
          timeEnd: new Date(moment(shiftFromFields.date)
            .hours(shiftFromFields.timeEnd.substr(0, 2))
            .add(1, 'hours')
            .minutes(shiftFromFields.timeEnd.substr(3, 2))
            .seconds(0)
            .toDate()),
          route: {id: shiftRoute.id}
        };
        this.shiftService.updateShift(shiftToUpdate)
          .subscribe(stu => {
            shiftToUpdate = stu;
            this.router.navigateByUrl('/shift-overview');
          });
      });
  }
  patchTime() {
    if (moment(this.currentShift.timeStart).minute() < 10) {
      this.shiftForm.controls.timeStart
        .setValue(`${moment(this.currentShift.timeStart).hour()}:${moment(this.currentShift.timeStart).minute()}0`);
    } else {
      this.shiftForm.controls.timeStart
        .setValue(`${moment(this.currentShift.timeStart).hour()}:${moment(this.currentShift.timeStart).minute()}`);
    }
    if (moment(this.currentShift.timeEnd).minute() < 10) {
      this.shiftForm.controls.timeEnd
        .setValue(`${moment(this.currentShift.timeEnd).hour()}:${moment(this.currentShift.timeEnd).minute()}0`);
    } else {
      this.shiftForm.controls.timeEnd
        .setValue(`${moment(this.currentShift.timeEnd).hour()}:${moment(this.currentShift.timeEnd).minute()}`);
    }
  }
}
