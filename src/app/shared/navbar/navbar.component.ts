import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user-model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService) {
  }
  cUser: User;
  setToChosen(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUser(currentUser.id).subscribe(u => this.cUser = u);
  }
    ngOnInit() {this.setToChosen()}

  }
