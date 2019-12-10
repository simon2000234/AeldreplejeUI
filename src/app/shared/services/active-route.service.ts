import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {ActiveRoute} from '../models/active-route-model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ActiveRouteService {

  apiUrl = environment.baseUrl + 'activeroutes';
  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }
  getActiveRoutes(): Observable<ActiveRoute[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.get<ActiveRoute[]>(this.apiUrl, httpOptions);
  }
  getActiveRoute(id: number): Observable<ActiveRoute> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ActiveRoute>(url, httpOptions);
  }
  addActiveRoute(activeRoute: ActiveRoute): Observable<ActiveRoute> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post<ActiveRoute>(this.apiUrl, activeRoute, httpOptions);
  }
  updateActiveRoute(activeRoute: ActiveRoute): Observable<ActiveRoute> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${activeRoute.id}`;
    return this.http.put<ActiveRoute>(url, activeRoute, httpOptions);
  }
  deleteGroup(id: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
