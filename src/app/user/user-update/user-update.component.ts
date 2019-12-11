import { Component, OnInit } from '@angular/core';
import {Group} from "../../shared/models/group-model";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {GroupService} from "../../shared/services/group.service";
import {User} from "../../shared/models/user-model";
import {log} from "util";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userForm = this.fb.group({
    name: [''],
    isAdmin: [''],
    email: [''],
    userGroup: [''],
    profilePicture: [''],
    password: ['']
  });
  id;
  Groups: Group[];
  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private groupService: GroupService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.groupService.getGroups()
      .subscribe(groups => {
        this.Groups = groups;
        this.userService.getUser(this.id)
          .subscribe(userFromRest => {
            console.log(userFromRest.isAdmin);
            this.userForm.patchValue({
              name: userFromRest.name,
              isAdmin: userFromRest.isAdmin,
              email: userFromRest.email,
              profilePicture: userFromRest.profilePicture
            });
            this.userForm.controls.userGroup.setValue(userFromRest.group.type);
          });
      });
  }
  changeGroup(e) {
    console.log(e.target.value);
    this.userForm.get('userGroup').setValue(e.target.value, {
      onlySelf: true
    });
  }
  save() {
    let groupName = this.userForm.value.userGroup.substr(3);
    console.log(groupName);
    let chosenGroup = this.Groups.find(g => g.type === groupName);
    if (chosenGroup == null) {
      groupName = this.userForm.value.userGroup;
      chosenGroup = this.Groups.find(g => g.type === groupName);
    }
    const userToUpdate: User = {
      id: this.id,
      name: this.userForm.value.name,
      group: {id: chosenGroup.id},
      email: this.userForm.value.email,
      profilePicture: this.userForm.value.profilePicture,
      isAdmin: this.userForm.value.isAdmin,
      password: this.userForm.value.password
    };
    console.log(chosenGroup);
    this.userService.updateUser(userToUpdate)
      .subscribe(() => {
        this.router.navigateByUrl('/user-overview');
      });
  }

}
