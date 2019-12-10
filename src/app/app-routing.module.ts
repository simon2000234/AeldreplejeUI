import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShiftCreateComponent} from './shift/shift-create/shift-create.component';
import {ShiftOverviewComponent} from './shift/shift-overview/shift-overview.component';
import {ShiftUpdateComponent} from './shift/shift-update/shift-update.component';
import {LoginComponent} from './login/login/login.component';
import {TestComponent} from './login/test/test.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {UserPageComponent} from './user/user-page/user-page.component';
import {PshiftViewComponent} from './shift/calendar-day/pshift-view/pshift-view.component';
import {ShiftChooseComponent} from './shift/shift-choose/shift-choose.component';
import {AdminPageComponent} from './admin/admin-page/admin-page.component';
import {RouteListComponent} from './route/route-list/route-list.component';
import {RouteCreateComponent} from './route/route-create/route-create.component';
import {RouteUpdateComponent} from './route/route-update/route-update.component';
import {TimeStartOverviewComponent} from './time-start/time-start-overview/time-start-overview.component';
import {TimeStartCreateComponent} from './time-start/time-start-create/time-start-create.component';
import {TimeStartUpdateComponent} from './time-start/time-start-update/time-start-update.component';
import {TimeEndOverviewComponent} from "./time-end/time-end-overview/time-end-overview.component";
import {TimeEndCreateComponent} from "./time-end/time-end-create/time-end-create.component";
import {TimeEndUpdateComponent} from "./time-end/time-end-update/time-end-update.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'shift-create', component: ShiftCreateComponent, canActivate: [AuthGuard]},
  {path: 'shift-update/:id', component: ShiftUpdateComponent, canActivate: [AuthGuard]},
  {path: 'shift-overview', component: ShiftOverviewComponent, canActivate: [AuthGuard]},
  {path: 'pending-calendar-shift', component: PshiftViewComponent},
  {path: 'admin-page', component: AdminPageComponent},
  {path: 'route-overview', component: RouteListComponent},
  {path: 'route-create', component: RouteCreateComponent},
  {path: 'route-update/:id', component: RouteUpdateComponent},
  {path: 'time-start-overview', component: TimeStartOverviewComponent},
  {path: 'time-start-create', component: TimeStartCreateComponent},
  {path: 'time-start-update/:id', component: TimeStartUpdateComponent},
  {path: 'time-end-overview', component: TimeEndOverviewComponent},
  {path: 'time-end-create', component: TimeEndCreateComponent},
  {path: 'time-end-update/:id', component: TimeEndUpdateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'test', component: TestComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: 'choose/:id', component: ShiftChooseComponent, canActivate: [AuthGuard]} ,
  {path: '', component: LoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
