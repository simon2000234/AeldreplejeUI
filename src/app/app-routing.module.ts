import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShiftCreateComponent} from './shift/shift-create/shift-create.component';
import {ShiftOverviewComponent} from './shift/shift-overview/shift-overview.component';
import {ShiftUpdateComponent} from './shift/shift-update/shift-update.component';
import {LoginComponent} from './login/login/login.component';
import {TestComponent} from './login/test/test.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'shift-create', component: ShiftCreateComponent},
  {path: 'shift-update', component: ShiftUpdateComponent},
  {path: 'shift-overview', component: ShiftOverviewComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'test', component: TestComponent},
  {path: '', component: HomeComponent},

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
