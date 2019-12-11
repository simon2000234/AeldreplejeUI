import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActiveRouteService} from '../../shared/services/active-route.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActiveRoute} from '../../shared/models/active-route-model';

@Component({
  selector: 'app-route-update',
  templateUrl: './route-update.component.html',
  styleUrls: ['./route-update.component.css']
})
export class RouteUpdateComponent implements OnInit {

  id;
  activeRouteForm = this.fb.group({
    name: ['']
  });
  constructor(private fb: FormBuilder,
              private arService: ActiveRouteService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.arService.getActiveRoute(this.id)
      .subscribe(arFromRest => {
        this.activeRouteForm.patchValue({
          name: arFromRest.name
        });
        });
  }
  save() {
    const activeRoute: ActiveRoute = {
      id: this.id,
      name: this.activeRouteForm.value.name};
    this.arService.updateActiveRoute(activeRoute)
      .subscribe(() => {
        this.router.navigateByUrl('/route-overview');
      });
  }
}
