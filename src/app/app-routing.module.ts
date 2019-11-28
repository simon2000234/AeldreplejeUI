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

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'shift-create', component: ShiftCreateComponent, canActivate: [AuthGuard]},
  {path: 'shift-update', component: ShiftUpdateComponent, canActivate: [AuthGuard]},
  {path: 'shift-overview', component: ShiftOverviewComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'test', component: TestComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserPageComponent},
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
