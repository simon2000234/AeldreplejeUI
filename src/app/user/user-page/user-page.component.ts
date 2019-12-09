import { Component, OnInit } from '@angular/core';
import {PendingShiftService} from 'src/app/shared/services/pending-shift.service';
import {PendingShift} from '../../shared/models/pendingshift-model';
import {Shift} from '../../shared/models/shift-model';
import {User} from '../../shared/models/user-model';
import {UserService} from '../../shared/services/user.service';
import {ShiftService} from '../../shared/services/shift.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private pendingShiftService: PendingShiftService, private userService: UserService,
              private shiftService: ShiftService) { }
  pShifts: PendingShift[];
  shifts: Shift[];
  currentUserId: number;
  setToChosen(ps: PendingShift): void {
    if (window.confirm('er du sikker på at du ka tage denne vagt')) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      ps.users.push({
        userId: currentUser.id,
        pendingShiftId: ps.id
      });
      this.pendingShiftService.updatePendingShift(ps).subscribe(() => {
        this.getPendingShifts();
      });
    }
  }

  removeFromChosen(ps: PendingShift): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    for (let i = 0; i < ps.users.length; i++) {
      if (ps.users[i].userId === currentUser.id && ps.users[i].pendingShiftId === ps.id) {
        ps.users.splice(i, 1);
      }
    }
    this.pendingShiftService.updatePendingShift(ps).subscribe(() => {
      this.getPendingShifts();
    });
  }
isCurrentUserOnPendingShift(pShift: PendingShift): boolean {
      for (const usp of pShift.users) {
        if (usp.userId === this.currentUserId) {
          return false;
        }
      }
      return true;
}
  isCurrentUserOnShift(shift: Shift): boolean {
    if (shift.user) {
      return shift.user.id === this.currentUserId;
    }
    return false;
  }
  getPendingShifts(): void {
this.pendingShiftService.getPendingShifts()
.subscribe(pShifts => this.pShifts = pShifts);
}
getShifts(): void {
    this.shiftService.getShifts()
      .subscribe(s => this.shifts = s);
}


  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.getPendingShifts();
    this.getShifts();
  }

}
