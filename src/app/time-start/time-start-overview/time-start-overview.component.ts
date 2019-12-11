import { Component, OnInit } from '@angular/core';
import {TimeStart} from '../../shared/models/time-start-model';
import {TimeStartService} from '../../shared/services/time-start.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-time-start-overview',
  templateUrl: './time-start-overview.component.html',
  styleUrls: ['./time-start-overview.component.css']
})
export class TimeStartOverviewComponent implements OnInit {

  timeStarts: TimeStart[];
  constructor(private tsService: TimeStartService,
              private router: Router) { }

  ngOnInit() {
    this.getTimeStarts();
  }

  getTimeStarts() {
    this.tsService.getTimeStarts()
      .subscribe(ts => this.timeStarts = ts);
  }
  delete(id: number) {
    this.tsService.deleteTimeStart(id)
      .subscribe(() => {
        this.getTimeStarts();
      });
  }

}
