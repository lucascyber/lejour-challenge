import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wendding } from '../models/wendding.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WenddingService {

  constructor(private http: HttpClient) { }

  getWenddings(
    {
      limit,
      id,
      owner_id,
      budget,
      wendding_date,
      number_of_guests,
      style
    }:
    {
      limit?: string,
      id?: string,
      owner_id?: string,
      budget?: string,
      wendding_date?: string,
      number_of_guests?: string,
      style?: string
    }
  ): Observable<Wendding[]> {
    const opt: {[k: string]: any} = {};

    Object.assign(opt,
      limit ? { limit } : null,
      id ? { id } : null,
      owner_id ? { owner_id } : null,
      budget ? { budget } : null,
      wendding_date ? { wendding_date } : null,
      number_of_guests ? { number_of_guests } : null,
      style ? { style } : null,
    );

    return this.http.get<Wendding[]>(environment.endPoints.wending, {params: opt});
  }
}
