import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GroupService} from "../../shared/services/group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeEnd} from "../../shared/models/time-end-model";
import {Group} from "../../shared/models/group-model";

@Component({
  selector: 'app-group-update',
  templateUrl: './group-update.component.html',
  styleUrls: ['./group-update.component.css']
})
export class GroupUpdateComponent implements OnInit {

  groupForm = this.fb.group({
    type: [''],
    qualificationNumber: ['']
  });
  id;
  constructor(private fb: FormBuilder,
              private groupService: GroupService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(this.id)
      .subscribe( groupFromRest => {
        this.groupForm.patchValue({
          type: groupFromRest.type,
          qualificationNumber: groupFromRest.qualificationNumber
        });
      });
  }
  save() {
    const group: Group = {
      id: this.id,
      type: this.groupForm.value.type,
      qualificationNumber: this.groupForm.value.qualificationNumber};
    this.groupService.updateGroup(group)
      .subscribe(() => {
          this.router.navigateByUrl('/group-overview');
        });
  }

}
