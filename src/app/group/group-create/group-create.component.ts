import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {TimeEndService} from '../../shared/services/time-end.service';
import {Router} from '@angular/router';
import {GroupService} from '../../shared/services/group.service';
import {TimeEnd} from '../../shared/models/time-end-model';
import {Group} from '../../shared/models/group-model';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
  groupForm = this.fb.group({
    type: ['']
  });
  constructor(private fb: FormBuilder,
              private groupService: GroupService,
              private router: Router) { }

  ngOnInit() {
  }
  save() {
    const group: Group = {type: this.groupForm.value.type};
    this.groupService.addGroup(group)
      .subscribe(() => {
          this.router.navigateByUrl('/group-overview');
        });
  }

}
