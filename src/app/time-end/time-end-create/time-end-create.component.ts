import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {TimeStartService} from '../../shared/services/time-start.service';
import {Router} from '@angular/router';
import {TimeEndService} from '../../shared/services/time-end.service';
import {TimeStart} from '../../shared/models/time-start-model';
import {TimeEnd} from '../../shared/models/time-end-model';

@Component({
  selector: 'app-time-end-create',
  templateUrl: './time-end-create.component.html',
  styleUrls: ['./time-end-create.component.css']
})
export class TimeEndCreateComponent implements OnInit {

  timeEndForm = this.fb.group({
    timeEnd: ['']
  });
  constructor(private fb: FormBuilder,
              private teService: TimeEndService,
              private router: Router) { }

  ngOnInit() {
  }
  save() {
    const timeEnd: TimeEnd = {timeEnd: this.timeEndForm.value.timeEnd};
    this.teService.addTimeEnd(timeEnd)
      .subscribe(() => {
        this.router.navigateByUrl('/time-end-overview');
      });
  }

}
