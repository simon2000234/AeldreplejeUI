import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ShiftRoute} from "../models/route-model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RouteService {

  apiUrl = environment.baseUrl + 'routes';
  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }
  getShiftRoutes(): Observable<ShiftRoute[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.get<ShiftRoute[]>(this.apiUrl, httpOptions);
  }
  getShiftRoute(id: number): Observable<ShiftRoute> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ShiftRoute>(url, httpOptions);
  }
  addShiftRoute(shiftRoute: ShiftRoute): Observable<ShiftRoute> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post<ShiftRoute>(this.apiUrl, shiftRoute, httpOptions);
  }
  updateShiftRoute(shiftRoute: ShiftRoute): Observable<ShiftRoute> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${shiftRoute.id}`;
    return this.http.put<ShiftRoute>(url, shiftRoute, httpOptions);
  }
  deleteShiftRoute(id: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
