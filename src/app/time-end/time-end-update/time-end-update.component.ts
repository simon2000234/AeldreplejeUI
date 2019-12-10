import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {TimeEndService} from "../../shared/services/time-end.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeEnd} from "../../shared/models/time-end-model";

@Component({
  selector: 'app-time-end-update',
  templateUrl: './time-end-update.component.html',
  styleUrls: ['./time-end-update.component.css']
})
export class TimeEndUpdateComponent implements OnInit {

  id;
  timeEndForm = this.fb.group({
    timeEnd: ['']
  });
  constructor(private fb: FormBuilder,
              private teService: TimeEndService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.teService.getTimeEnd(this.id)
      .subscribe(teFromRest => {
        this.timeEndForm.patchValue({
          timeEnd: teFromRest.timeEnd
        });
      });
  }
  save() {
    const timeEnd: TimeEnd = {
      id: this.id,
      timeEnd: this.timeEndForm.value.timeEnd};
    this.teService.updateTimeEnd(timeEnd)
      .subscribe(() => {
        this.router.navigateByUrl('/time-end-overview');
      });
  }

}
