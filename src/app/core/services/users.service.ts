import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http?: HttpClient) { }

  getUsers(
    limit?: number,
    id?: string,
    date?: Date
  ): Observable<User[]> {
    const params = new HttpParams();
    if (limit) { params.append('limit', limit.toString()); }
    if (id) { params.append('ÍD', id); }
    if (date) { params.append('CREATED_AT', date.toDateString()); }

    return this._http.get<User[]>(environment.endPoints.user, {params});
  }
}
