import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShiftCreateComponent} from "./shift/shift-create/shift-create.component";
import {ShiftOverviewComponent} from "./shift/shift-overview/shift-overview.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'shift-create', component: ShiftCreateComponent},
  {path: 'shift-overview', component: ShiftOverviewComponent},
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
