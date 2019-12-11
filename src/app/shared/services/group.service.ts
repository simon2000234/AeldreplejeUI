import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Shift} from "../models/shift-model";
import {Group} from "../models/group-model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  apiUrl = environment.baseUrl + 'group';
  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }
  getGroups(): Observable<Group[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.get<Group[]>(this.apiUrl, httpOptions);
  }
  getGroup(id: number): Observable<Group> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Group>(url, httpOptions);
  }
  addGroup(group: Group): Observable<Group> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post<Group>(this.apiUrl, group, httpOptions);
  }
  updateGroup(group: Group): Observable<Group> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${group.id}`;
    return this.http.put<Group>(url, group, httpOptions);
  }
  deleteGroup(id: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
