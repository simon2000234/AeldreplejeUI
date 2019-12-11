import { Component, OnInit } from '@angular/core';
import {Group} from '../../shared/models/group-model';
import {GroupService} from '../../shared/services/group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.css']
})
export class GroupOverviewComponent implements OnInit {

  Groups: Group[];
  constructor(private groupService: GroupService,
              private router: Router) { }

  ngOnInit() {
    this.getGroups();
  }
  getGroups() {
    this.groupService.getGroups()
      .subscribe(groups => this.Groups = groups);
  }
  delete(id: number) {
    this.groupService.deleteGroup(id)
      .subscribe(() => {
        this.getGroups();
      });
  }

}
