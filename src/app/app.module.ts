import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ShiftCreateComponent } from './shift/shift-create/shift-create.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShiftOverviewComponent } from './shift/shift-overview/shift-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    ShiftCreateComponent,
    HomeComponent,
    ShiftOverviewComponent
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
