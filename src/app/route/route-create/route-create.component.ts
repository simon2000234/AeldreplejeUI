import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActiveRouteService} from '../../shared/services/active-route.service';
import {ActiveRoute} from '../../shared/models/active-route-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-route-create',
  templateUrl: './route-create.component.html',
  styleUrls: ['./route-create.component.css']
})
export class RouteCreateComponent implements OnInit {

  activeRouteForm = this.fb.group({
    name: ['']
  });
  constructor(private fb: FormBuilder,
              private arService: ActiveRouteService,
              private router: Router) { }

  ngOnInit() {
  }
  save() {
    const activeRoute: ActiveRoute = {name: this.activeRouteForm.value.name};
    this.arService.addActiveRoute(activeRoute)
      .subscribe(() => {
        this.router.navigateByUrl('/route-overview');
      });
  }

}
