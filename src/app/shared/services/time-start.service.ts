import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Shift} from "../models/shift-model";
import {TimeStart} from "../models/time-start-model";
import {Time} from "@angular/common";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class TimeStartService {

  apiUrl = environment.baseUrl + 'timestarts';
  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }
  getTimeStarts(): Observable<TimeStart[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.get<TimeStart[]>(this.apiUrl, httpOptions);
  }
  getTimeStart(id: number): Observable<TimeStart> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TimeStart>(url, httpOptions);
  }
  addTimeStart(timeStart: TimeStart): Observable<TimeStart> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post<TimeStart>(this.apiUrl, timeStart, httpOptions);
  }
  updateTimeStart(timeStart: TimeStart): Observable<TimeStart> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${timeStart.id}`;
    return this.http.put<TimeStart>(url, timeStart, httpOptions);
  }
  deleteTimeStart(id: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
