import { Component, OnInit } from '@angular/core';
import {PendingShiftService} from 'src/app/shared/services/pending-shift.service';
import {PendingShift} from '../../shared/models/pendingshift-model';
import {Shift} from '../../shared/models/shift-model';
import {User} from '../../shared/models/user-model';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private pendingShiftService: PendingShiftService, private userService: UserService) { }
  pShifts: PendingShift[];
  currentUserId: number;
  setToChosen(ps: PendingShift): void {
    if (window.confirm('er du sikker på at du ka tage denne vagt')) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      ps.users.push({
        userId: currentUser.id,
        pendingShiftId: ps.id
      });
      this.pendingShiftService.updatePendingShift(ps).subscribe(location.reload);
    }
  }

  removeFromChosen(ps: PendingShift): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    for (let i = 0; i < ps.users.length; i++) {
      if (ps.users[i].userId === currentUser.id && ps.users[i].pendingShiftId === ps.id) {
        ps.users.splice(i, 1);
      }
    }
    this.pendingShiftService.updatePendingShift(ps).subscribe();
  }
isCurrentUserOnPendingShift(): boolean {
    for (const pShift of this.pShifts) {
      for (const usp of pShift.users) {
        if (usp.userId === this.currentUserId) {
          return false;
        }
      }
      return true;
    }
}
  getPendingShifts(): void {
this.pendingShiftService.getPendingShifts()
.subscribe(pShifts => this.pShifts = pShifts);
}


  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.getPendingShifts();
  }

}
