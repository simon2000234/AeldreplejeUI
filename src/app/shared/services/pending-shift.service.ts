import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Shift} from "../models/shift-model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../../environments/environment";
import {PendingShift} from "../models/pendingshift-model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class PendingShiftService {

  apiUrl = environment.baseUrl + 'pendingshifts';
  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }
  getPendingShifts(): Observable<PendingShift[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.get<PendingShift[]>(this.apiUrl, httpOptions);
  }
  getPendingShift(id: number): Observable<PendingShift> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PendingShift>(url, httpOptions);
  }
  addPendingShift(pendingShift: PendingShift): Observable<PendingShift> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post<PendingShift>(this.apiUrl, pendingShift, httpOptions);
  }
  updatePendingShift(pendingshift: PendingShift): Observable<PendingShift> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${pendingshift.id}`;
    return this.http.put<PendingShift>(url, pendingshift, httpOptions);
  }
  deletePendingShift(id: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}