import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';
import { environment } from 'src/environments/environment';
import { Chart } from '../models/chart.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getInvoices(
    {
      limit,
      id,
      wendding_id,
      vendor_id,
      amount,
      vendor_amount,
      created_at,
      accepted,
      vendor_category,
    }:
    {
      limit?: string,
      id?: string,
      wendding_id?: string,
      vendor_id?: string,
      amount?: string,
      vendor_amount?: string,
      created_at?: string,
      accepted?: string,
      vendor_category?: string,
    }
  ): Observable<Invoice[]> {
    const opt: {[k: string]: any} = {};

    Object.assign(opt,
      limit ? { limit } : null,
      id ? { id } : null,
      wendding_id ? { wendding_id } : null,
      vendor_id ? { vendor_id } : null,
      amount ? { amount } : null,
      vendor_amount ? { vendor_amount } : null,
      created_at ? { created_at } : null,
      accepted ? { accepted } : null,
      vendor_category ? { vendor_category } : null,
    );
    return this.http.get<Invoice[]>(environment.endPoints.invoice, {params: opt});
  }
}
