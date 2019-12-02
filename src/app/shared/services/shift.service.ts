import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {Shift} from "../models/shift-model";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  apiUrl = environment.baseUrl + 'shift';
  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }
  getShifts(): Observable<Shift[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.get<Shift[]>(this.apiUrl, httpOptions);
  }
  getShift(id: number): Observable<Shift> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Shift>(url, httpOptions);
  }
  addShift(shift: Shift): Observable<Shift> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post<Shift>(this.apiUrl, shift, httpOptions);
  }
  updateShift(shift: Shift): Observable<Shift> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${shift.id}`;
    return this.http.put<Shift>(url, shift, httpOptions);
  }
  deleteShift(id: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
