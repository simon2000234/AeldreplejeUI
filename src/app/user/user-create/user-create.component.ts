import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {Group} from "../../shared/models/group-model";
import {UserService} from "../../shared/services/user.service";
import {GroupService} from "../../shared/services/group.service";
import {User} from "../../shared/models/user-model";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm = this.fb.group({
    name: [''],
    isAdmin: [''],
    email: [''],
    userGroup: [''],
    profilePicture: ['']
  });
  Groups: Group[];
  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getGroups()
      .subscribe(groups => {
        this.Groups = groups;
        this.userForm.controls.isAdmin.setValue(false);
      });
  }
  changeGroup(e) {
    console.log(e.target.value);
    this.userForm.get('userGroup').setValue(e.target.value, {
      onlySelf: true
    });
  }
  save() {
    const groupName = this.userForm.value.userGroup.substr(3);
    console.log(groupName);
    const chosenGroup = this.Groups.find(g => g.type === groupName);
    console.log(chosenGroup);
    const userToCreate: User = {
      name: this.userForm.value.name,
      group: {id: chosenGroup.id},
      email: this.userForm.value.email,
      profilePicture: this.userForm.value.profilePicture,
      isAdmin: this.userForm.value.isAdmin
    };
    this.userService.addUser(userToCreate)
      .subscribe(() => {
        this.router.navigateByUrl('/user-overview');
      });
  }

}
