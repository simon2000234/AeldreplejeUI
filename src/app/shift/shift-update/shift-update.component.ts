import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {ShiftService} from '../../shared/services/shift.service';
import {RouteService} from '../../shared/services/route.service';
import {PendingShiftService} from '../../shared/services/pending-shift.service';
import {ShiftRoute} from '../../shared/models/route-model';
import {Shift} from '../../shared/models/shift-model';
import {PendingShift} from '../../shared/models/pendingshift-model';

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
  constructor(private fb: FormBuilder,
              private router: Router,
              private shiftService: ShiftService,
              private routeService: RouteService,
              private pShiftService: PendingShiftService
  ) { }

  ngOnInit() {
  }

  save() {
    const shiftFromFields = this.shiftForm.value;
    let shiftRoute: ShiftRoute = {name: shiftFromFields.route};

    this.routeService.updateShiftRoute(shiftRoute)
      .subscribe(sr => {
        shiftRoute = sr;
        let shiftToUpdate: Shift = {
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
