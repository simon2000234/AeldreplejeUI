import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
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

  currentDate: Date;
  shiftForm = this.fb.group({
    date: [''],
    timeStart: [''],
    timeEnd: [''],
    route: [''],
    activeRoute: [''],
    user: ['']
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
    this.shiftForm.get('date').patchValue(new Date(moment(this.currentDate).format('dd-MM-yyyy')));
  }

  save() {
    const shiftFromFields = this.shiftForm.value;
    let shiftRoute: ShiftRoute = {name: shiftFromFields.route};

    this.routeService.addShiftRoute(shiftRoute)
      .subscribe(sr => {
        shiftRoute = sr;
        let shiftToCreate: Shift = {
          date: new Date(shiftFromFields.date),
          timeStart: new Date(shiftFromFields.timeStart),
          timeEnd: new Date(shiftFromFields.timeEnd),
          activeRoute: shiftFromFields.activeRoute,
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
