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
