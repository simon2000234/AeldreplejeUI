import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {PendingShift} from '../../shared/models/pendingshift-model';
import {User} from '../../shared/models/user-model';
import {PendingShiftService} from '../../shared/services/pending-shift.service';
import {UserPendingShift} from '../../shared/models/user-pending-shift-model';
import {ActivatedRoute, Router} from '@angular/router';
import {ShiftService} from '../../shared/services/shift.service';
import {Shift} from '../../shared/models/shift-model';
import {CalendarService} from '../../shared/services/calendar.service';


@Component({
  selector: 'app-shift-choose',
  templateUrl: './shift-choose.component.html',
  styleUrls: ['./shift-choose.component.css']
})
export class ShiftChooseComponent implements OnInit {

  constructor(private pendingShiftService: PendingShiftService,
              private route: ActivatedRoute,
              private shiftService: ShiftService,
              private navigator: Router,
              private calSer: CalendarService) {
  }
  pShift: PendingShift;
  id: number;

  getPendingShift(): void {
    this.pendingShiftService.getPendingShift(this.id)
      .subscribe(pender => this.setInfo(pender));
  }

  setInfo(pender: PendingShift): void {
    this.pShift = pender;
  }

saveShift(user: User): void {
    this.shiftService.getShift(this.pShift.shiftId).subscribe(s => this.updateShift(s, user));
}

checkIfShiftIsOnSameDay(user: User): boolean {
  for (let i = 0; i < user.shifts.length ; i++) {
    const d1 = user.shifts[i].date.toString().slice(0, 10);
    const d2 = this.calSer.calendarDate.toISOString().slice(0, 10);
    if ( d1 === d2) {
      return true;
    }
  }
  return false;
}

updateShift(shift: Shift, user: User): void {
  shift.user = user;
  this.shiftService.updateShift(shift).subscribe(s => this.navigator.navigateByUrl('shift-overview'));
}

  ngOnInit() {
    this.id = Number (this.route.snapshot.paramMap.get('id'));
    this.getPendingShift();
  }

}
