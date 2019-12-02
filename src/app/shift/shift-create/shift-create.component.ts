import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ShiftRoute} from "../../shared/models/route-model";
import {User} from "../../shared/models/user-model";
import {Router} from "@angular/router";
import {ShiftService} from "../../shared/services/shift.service";
import {RouteService} from "../../shared/services/route.service";
import {PendingShiftService} from "../../shared/services/pending-shift.service";
import {Shift} from "../../shared/models/shift-model";
import {PendingShift} from "../../shared/models/pendingshift-model";

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.css']
})
export class ShiftCreateComponent implements OnInit {

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

    this.routeService.addShiftRoute(shiftRoute)
      .subscribe(sr => shiftRoute = sr);

    let shiftToCreate: Shift = {
      date: shiftFromFields.date,
      timeStart: shiftFromFields.timeStart,
      timeEnd: shiftFromFields.timeEnd,
      activeRoute: shiftFromFields.activeRoute,
      route: {id: shiftRoute.id}
    };

    this.shiftService.addShift(shiftToCreate)
      .subscribe(stc => shiftToCreate = stc);

    const pShiftToCreate: PendingShift = {
      shift: shiftToCreate
    };
    this.pShiftService.addPendingShift(pShiftToCreate)
      .subscribe(() => {
        this.router.navigateByUrl('/shift-overview');
      });
  }

}
