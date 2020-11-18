import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http?: HttpClient) { }

  getUsers( { limit, id, date,}: { limit?: string, id?: string, date?: string }
  ): Observable<User[]> {
    const opt: {[k: string]: any} = {};

    Object.assign(opt,
      limit ? { limit } : null,
      id ? { id } : null,
      date ? { created_at: date } : null
    );

    return this._http.get<User[]>(environment.endPoints.user, {params: opt});
  }
}
