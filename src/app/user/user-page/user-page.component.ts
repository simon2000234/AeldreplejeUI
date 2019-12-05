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
  cUser: User;
  setToChosen(ps: PendingShift): void {
    if (window.confirm('er du sikker på at du ka tage denne vagt')){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    ps.users.push({
      userId: currentUser.id,
      pendingShiftId: ps.id
    });
    this.pendingShiftService.updatePendingShift(ps).subscribe();
    /*this.userService.getUser(currentUser.id).subscribe(u => {this.cUser = u;
                                                             ps.users.push(this.cUser);
                                                             this.pendingShiftService.updatePendingShift(ps).subscribe();
    });*/}
  }


  getPendingShifts(): void {
this.pendingShiftService.getPendingShifts()
.subscribe(pShifts => this.pShifts = pShifts);
}


  ngOnInit() {
    this.getPendingShifts();
  }

}
