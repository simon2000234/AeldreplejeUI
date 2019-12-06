import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Shift} from '../models/shift-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../../environments/environment';
import {PendingShift} from '../models/pendingshift-model';
import {debug} from 'util';

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

  apiUrl = environment.baseUrl + 'pendingshift';
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
      pendingshift.users.forEach(user => user.pendingShift = {id: user.pendingShiftId});
      pendingshift.users.forEach(user => user.user = {id: user.userId});
      pendingshift.users.forEach(user => user.userId = undefined);
      pendingshift.users.forEach(user => user.pendingShiftId = undefined);
      pendingshift.shift = {id: pendingshift.shift.id};
      pendingshift.shiftId = undefined;

      httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
      const url = `${this.apiUrl}/${pendingshift.id}`;
      return this.http.put<any>(url, pendingshift, httpOptions);
  }
  deletePendingShift(id: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
