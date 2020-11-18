import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice.model';
import { Wendding } from '../models/wendding.model';
import { Chart } from '../models/chart.model';
import { Months } from '../enum/months.enum';
import { fromEventPattern } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  public chartBartData: Chart;

  constructor() { }

  // Filter Sales By Months
  filterTotalSalesByMonths(invoices: Invoice[], year: number): Chart {
    // Get Months list
    const cat = invoices.filter((x) => new Date(x.CREATED_AT).getFullYear() === year);
    const months = cat.map((m) => new Date(m.CREATED_AT).getMonth());
    const monthsMerged = months.filter((x, i) => months.indexOf(x) === i);
    const labelMonths = monthsMerged.map((k) => Months[k]);


    const amountTotal = monthsMerged.map((m) => (
      invoices.filter((i) => new Date(i.CREATED_AT).getMonth() === m)
      .map((x) => x.AMOUNT).reduce((total, num) => Math.round(total + num))
    ));

    return {
      data: amountTotal,
      labels: labelMonths,
    };
  }

  // Filter Sales By Year
  filterTotalSalesByYear(invoices: Invoice[]): Chart {
    // Get Years list
    const cat = invoices.map((x) => new Date(x.CREATED_AT).getFullYear());
    const years = cat.filter((x, i) => cat.indexOf(x) === i);

    const amountTotal = years.map((y) => (
      invoices.filter((i) => new Date(i.CREATED_AT).getFullYear() === y)
      .map((x) => x.AMOUNT).reduce((total, num) => Math.round(total + num))
    ));

    console.log(amountTotal, years)
    return {
      data: amountTotal,
      labels: years,
    };
  }

  // filter weddings by Month
  filterTotalWeddingsByYear(weddings: Wendding[]) {
    const cat = weddings.map((wedding) => new Date(wedding.WEDDING_DATE).getFullYear());
    const years = cat.filter((x, i) => cat.indexOf(x) === i);
    console.log(cat)
    console.log(years)

    const totalWeddingsPerYear = years.map((y) => (
      weddings.filter((i) => new Date(i.WEDDING_DATE).getFullYear() === y)
      .map((x) => new Date(x.WEDDING_DATE).getMonth() + 1).length
    ));

    return {
      data: totalWeddingsPerYear,
      labels: years,
    }
  }
}
