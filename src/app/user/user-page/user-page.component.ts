import { Component, OnInit } from '@angular/core';
import {PendingShiftService} from 'src/app/shared/services/pending-shift.service';
import {PendingShift} from '../../shared/models/pendingshift-model';
import {Shift} from '../../shared/models/shift-model';
import {User} from '../../shared/models/user-model';
import {UserSer}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private pendingShiftService: PendingShiftService) { }
  pShifts: PendingShift[];
  cUser: User;
  setToChosen(ps: PendingShift): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.(currentUser.id).subscribe(u => this.cUser = u);
    ps.users.push(this.cUser))
    this.pendingShiftService.updatePendingShift(ps);
  }


  getPendingShifts(): void {
this.pendingShiftService.getPendingShifts()
.subscribe(pShifts => this.pShifts = pShifts);
}


  ngOnInit() {
    this.getPendingShifts();
  }

}
