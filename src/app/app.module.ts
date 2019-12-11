import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { ShiftCreateComponent } from './shift/shift-create/shift-create.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShiftOverviewComponent } from './shift/shift-overview/shift-overview.component';
import { ShiftUpdateComponent } from './shift/shift-update/shift-update.component';
import { TestComponent } from './login/test/test.component';
import {HttpClientModule} from '@angular/common/http';
import {CalendarService} from './shared/services/calendar.service';
import { PshiftViewComponent } from './shift/calendar-day/pshift-view/pshift-view.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { ShiftChooseComponent } from './shift/shift-choose/shift-choose.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { RouteListComponent } from './route/route-list/route-list.component';
import { RouteCreateComponent } from './route/route-create/route-create.component';
import { RouteUpdateComponent } from './route/route-update/route-update.component';
import { TimeStartOverviewComponent } from './time-start/time-start-overview/time-start-overview.component';
import { TimeStartCreateComponent } from './time-start/time-start-create/time-start-create.component';
import { TimeStartUpdateComponent } from './time-start/time-start-update/time-start-update.component';
import { TimeEndOverviewComponent } from './time-end/time-end-overview/time-end-overview.component';
import { TimeEndCreateComponent } from './time-end/time-end-create/time-end-create.component';
import { TimeEndUpdateComponent } from './time-end/time-end-update/time-end-update.component';
import { UserOverviewComponent } from './user/user-overview/user-overview.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { GroupOverviewComponent } from './group/group-overview/group-overview.component';
import { GroupCreateComponent } from './group/group-create/group-create.component';
import { GroupUpdateComponent } from './group/group-update/group-update.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShiftCreateComponent,
    HomeComponent,
    ShiftOverviewComponent,
    ShiftUpdateComponent,
    TestComponent,
    PshiftViewComponent,
    NavbarComponent,
    UserPageComponent,
    ShiftChooseComponent,
    AdminPageComponent,
    RouteListComponent,
    RouteCreateComponent,
    RouteUpdateComponent,
    TimeStartOverviewComponent,
    TimeStartCreateComponent,
    TimeStartUpdateComponent,
    TimeEndOverviewComponent,
    TimeEndCreateComponent,
    TimeEndUpdateComponent,
    UserOverviewComponent,
    UserCreateComponent,
    UserUpdateComponent,
    GroupOverviewComponent,
    GroupCreateComponent,
    GroupUpdateComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
