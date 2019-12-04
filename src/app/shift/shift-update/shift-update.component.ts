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

@Component({
  selector: 'app-shift-update',
  templateUrl: './shift-update.component.html',
  styleUrls: ['./shift-update.component.css']
})
export class ShiftUpdateComponent implements OnInit {

  shiftForm = this.fb.group({
    date: [''],
    timeStart: [''],
    timeEnd: [''],
    route: [''],
    activeRoute: [''],
    user: ['']
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
        this.shiftForm.patchValue({
          route: pshiftFromRest.shift.route.name,
          activeRoute: pshiftFromRest.shift.activeRoute
            });
      });
  }

  save() {
    const shiftFromFields = this.shiftForm.value;
    let shiftRoute: ShiftRoute = {
      id: this.currentRoute.id,
      name: shiftFromFields.route};

    this.routeService.updateShiftRoute(shiftRoute)
      .subscribe(sr => {
        shiftRoute = sr;
        let shiftToUpdate: Shift = {
          id: this.currentShift.id,
          date: new Date(shiftFromFields.date),
          timeStart: new Date(shiftFromFields.timeStart),
          timeEnd: new Date(shiftFromFields.timeEnd),
          activeRoute: shiftFromFields.activeRoute,
          route: {id: shiftRoute.id}
        };
        this.shiftService.updateShift(shiftToUpdate)
          .subscribe(stu => {
            shiftToUpdate = stu;
            const pShiftToUpdate: PendingShift = {
              id: this.id,
              shift: {id: shiftToUpdate.id}
            };
            this.pShiftService.updatePendingShift(pShiftToUpdate)
              .subscribe(() => {
                this.router.navigateByUrl('/shift-overview');
              });
          });
      });
  }
}
