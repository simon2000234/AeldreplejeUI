import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ShiftRoute} from "../../shared/models/route-model";
import {User} from "../../shared/models/user-model";

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.css']
})
export class ShiftCreateComponent implements OnInit {

  shiftForm = this.fb.group({
    date: [''],
    timeStart: [''],
    timeEnd: [''],
    route: [''],
    activeRoute: [''],
    user: ['']
  });
  constructor(private fb: FormBuilder,
              ) { }

  ngOnInit() {
  }

}
