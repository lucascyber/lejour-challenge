import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WenddingFavorites } from '../models/wendding-favorite.model';

@Injectable({
  providedIn: 'root'
})
export class WenddingFavoriteService {

  constructor(private http: HttpClient) { }

  getAppointments(
    {
      limit,
      wendding_id,
      vendor_id,
    }:
    {
      limit?: string,
      wendding_id?: string,
      vendor_id?: string,
    }
  ): Observable<WenddingFavorites[]> {
    const opt: {[k: string]: any} = {};

    Object.assign(opt,
      limit ? { limit } : null,
      wendding_id ? { wendding_id } : null,
      vendor_id ? { vendor_id } : null,
    );
    return this.http.get<WenddingFavorites[]>(environment.endPoints.favorites, {params: opt});
  }
}
