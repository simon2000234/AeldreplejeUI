import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActiveRouteService} from '../../shared/services/active-route.service';
import {Router} from '@angular/router';
import {TimeStartService} from '../../shared/services/time-start.service';
import {ActiveRoute} from "../../shared/models/active-route-model";
import {TimeStart} from "../../shared/models/time-start-model";

@Component({
  selector: 'app-time-start-create',
  templateUrl: './time-start-create.component.html',
  styleUrls: ['./time-start-create.component.css']
})
export class TimeStartCreateComponent implements OnInit {

  timeStartForm = this.fb.group({
    timeStart: ['']
  });
  errorMessage = '';
  constructor(private fb: FormBuilder,
              private tsService: TimeStartService,
              private router: Router) { }

  ngOnInit() {
  }
  save() {
    const timeStart: TimeStart = {timeStart: this.timeStartForm.value.timeStart};
    this.tsService.addTimeStart(timeStart)
      .subscribe(() => {
        this.router.navigateByUrl('/time-start-overview');
      },
        error => {
          this.errorMessage = error.message;
        });
  }

}
