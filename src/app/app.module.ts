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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShiftCreateComponent,
    HomeComponent,
    ShiftOverviewComponent,
    ShiftUpdateComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,

    AppRoutingModule,

    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
