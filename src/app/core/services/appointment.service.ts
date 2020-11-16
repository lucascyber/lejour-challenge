import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAppointments(
    {
      limit,
      id,
      wendding_id,
      vendor_id,
      status,
      begins_at,
      vendor_category,
    }:
    {
      limit?: string,
      id?: string,
      wendding_id?: string,
      vendor_id?: string,
      status?: string,
      begins_at?: string,
      vendor_category?: string,
    }
  ): Observable<Appointment[]> {
    const opt: {[k: string]: any} = {};

    Object.assign(opt,
      limit ? { limit } : null,
      id ? { id } : null,
      wendding_id ? { wendding_id } : null,
      vendor_id ? { vendor_id } : null,
      status ? { status } : null,
      begins_at ? { begins_at } : null,
      vendor_category ? { vendor_category } : null,
    );
    return this.http.get<Appointment[]>(environment.endPoints.appointment, {params: opt});
  }
}
