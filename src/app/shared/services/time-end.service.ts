import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {Shift} from "../models/shift-model";
import {TimeEnd} from "../models/time-end-model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class TimeEndService {

  apiUrl = environment.baseUrl + 'timeends';
  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }
  getTimeEnds(): Observable<TimeEnd[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.get<TimeEnd[]>(this.apiUrl, httpOptions);
  }
  getTimeEnd(id: number): Observable<TimeEnd> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TimeEnd>(url, httpOptions);
  }
  addTimeEnd(timeEnd: TimeEnd): Observable<TimeEnd> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post<TimeEnd>(this.apiUrl, timeEnd, httpOptions);
  }
  updateTimeEnd(timeEnd: TimeEnd): Observable<TimeEnd> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${timeEnd.id}`;
    return this.http.put<TimeEnd>(url, timeEnd, httpOptions);
  }
  deleteShift(id: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
