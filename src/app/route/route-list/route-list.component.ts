import { Component, OnInit } from '@angular/core';
import {ActiveRouteService} from '../../shared/services/active-route.service';
import {ActiveRoute} from '../../shared/models/active-route-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  ActiveRoutes: ActiveRoute[];
  constructor(private arService: ActiveRouteService,
              private router: Router) { }

  ngOnInit() {
    this.getActiveRoutes();
  }
  delete(id: number) {
    this.arService.deleteActiveRoute(id)
      .subscribe(() => {
        this.getActiveRoutes();
      });
  }
  getActiveRoutes() {
    this.arService.getActiveRoutes()
      .subscribe(ar => this.ActiveRoutes = ar);
  }

}
