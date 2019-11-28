import { Component, OnInit } from '@angular/core';
import {PendingShiftService} from 'src/app/shared/services/pending-shift.service';
import {PendingShift} from '../../shared/models/pendingshift-model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private pendingShiftService: PendingShiftService) { }
  pShifts: PendingShift[];

  getPendingShifts(): void {
this.pendingShiftService.getPendingShifts()
.subscribe(pShifts => this.pShifts = pShifts);
}

  ngOnInit() {
  }

}
