import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice.model';
import { Wendding } from '../models/wendding.model';
import { Chart } from '../models/chart.model';
import { Months } from '../enum/months.enum';

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

    return {
      data: amountTotal,
      labels: years,
    };
  }

  // filter weddings by Month
  filterWeddingYears(weddings: Wendding[]): Array<number> {
    const cat = weddings.map((wedding) => new Date(wedding.WEDDING_DATE).getFullYear());
    const years = cat.filter((x, i) => cat.indexOf(x) === i);

    return years;
  }

  filterTotalWeddingsByMonth(weddings: Wendding[], year: number = 2020): Chart {
    const cat = weddings.filter((wedding) => new Date(wedding.WEDDING_DATE).getFullYear() === year);
    const months = cat.map((m) => new Date(m.WEDDING_DATE).getMonth());
    const monthsMerged = months.filter((x, i) => months.indexOf(x) === i);
    const labelMonths = monthsMerged.map((k) => Months[k]);

    const totalWeddingsPerMonth = monthsMerged.map((m) => (
      cat.filter((i) => new Date(i.WEDDING_DATE).getMonth() === m)
      .length
    ));
    
    return {
      data: totalWeddingsPerMonth,
      labels: labelMonths,
    }
  }

  filterWeddingsByStyle(weddings: Wendding[]): Chart {
    const weddingStyles = weddings.map((wedding) => wedding.STYLE)
    const stylesLabel = weddingStyles.filter((x, i) => weddingStyles.indexOf(x) === i)
    
    const totalByStyle = stylesLabel.map((m) => (
      weddingStyles.filter((i) => i === m)
      .length
    ));

    return {
      data: totalByStyle,
      labels: stylesLabel
    }
  }

  filterWeddingsByGuests(weddings: Wendding[], year: number = 2020): Chart {
    const yearFilter = weddings.filter((wedding) => new Date(wedding.WEDDING_DATE).getFullYear() === year)
    const guestsQuantity = yearFilter.map((g) => Math.round(g.NUMBER_OF_GUESTS));
    const guestsQuantityMerged = guestsQuantity.filter((x, i) => guestsQuantity.indexOf(x) === i);


    const guestsByYear = guestsQuantityMerged.map((q) => (
      yearFilter.filter((y) => Math.round(y.NUMBER_OF_GUESTS) === q)
      .length
    ));
    console.log(yearFilter);
    console.log(guestsQuantity);
    console.log(guestsQuantityMerged);

    console.log('quantidade de convidados', guestsByYear);
    console.log('label', guestsQuantityMerged);

    
    return {
      data: guestsByYear,
      labels: guestsQuantityMerged
    }
    //const guestsLabel = guestsQuantity.filter((x, i) => guestsQuantity.indexOf(x) === i);
    //console.log(guestsLabel);
  }
}
