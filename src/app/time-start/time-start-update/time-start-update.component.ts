import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActiveRouteService} from '../../shared/services/active-route.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TimeStartService} from '../../shared/services/time-start.service';
import {ActiveRoute} from "../../shared/models/active-route-model";
import {TimeStart} from "../../shared/models/time-start-model";

@Component({
  selector: 'app-time-start-update',
  templateUrl: './time-start-update.component.html',
  styleUrls: ['./time-start-update.component.css']
})
export class TimeStartUpdateComponent implements OnInit {

  id;
  timeStartForm = this.fb.group({
    timeStart: ['']
  });
  constructor(private fb: FormBuilder,
              private tsService: TimeStartService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.tsService.getTimeStart(this.id)
      .subscribe(tsFromRest => {
        this.timeStartForm.patchValue({
          timeStart: tsFromRest.timeStart
        });
      });
  }
  save() {
    const timeStart: TimeStart = {
      id: this.id,
      timeStart: this.timeStartForm.value.timeStart};
    this.tsService.updateTimeStart(timeStart)
      .subscribe(() => {
        this.router.navigateByUrl('/time-start-overview');
      });
  }

}
