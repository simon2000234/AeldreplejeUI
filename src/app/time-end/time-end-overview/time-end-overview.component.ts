import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TimeEndService} from '../../shared/services/time-end.service';
import {TimeEnd} from '../../shared/models/time-end-model';

@Component({
  selector: 'app-time-end-overview',
  templateUrl: './time-end-overview.component.html',
  styleUrls: ['./time-end-overview.component.css']
})
export class TimeEndOverviewComponent implements OnInit {

  timeEnds: TimeEnd[];
  constructor(private teService: TimeEndService,
              private router: Router) { }

  ngOnInit() {
    this.getTimeEnds();
  }
  getTimeEnds() {
    this.teService.getTimeEnds()
      .subscribe(te => this.timeEnds = te);
  }
  delete(id: number) {
    this.teService.deleteTimeEnd(id)
      .subscribe(() => {
        this.getTimeEnds();
      });
  }

}
