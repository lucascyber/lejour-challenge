import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice.model';
import { Chart } from '../models/chart.model';
import { Months } from '../enum/months.enum';
import { Appointment } from '../models/appointment.model';


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

  // Filter Sales By Months
  filterCommissionByMonths(invoices: Invoice[], year: number): Chart {
    // Get Months list
    const cat = invoices.filter((x) => new Date(x.CREATED_AT).getFullYear() === year);
    const months = cat.map((m) => new Date(m.CREATED_AT).getMonth());
    const monthsMerged = months.filter((x, i) => months.indexOf(x) === i);
    const labelMonths = monthsMerged.map((k) => Months[k]);


    const amountTotal = monthsMerged.map((m) => (
      invoices.filter((i) => new Date(i.CREATED_AT).getMonth() === m)
      .map((x) => x.AMOUNT).reduce((total, num) => Math.round(total + num))
    ));

    const vendorAmount = monthsMerged.map((m) => (
      invoices.filter((i) => new Date(i.CREATED_AT).getMonth() === m)
      .map((x) => x.VENDOR_AMOUNT).reduce((total, num) => Math.round(total + num))
    ));

    const totalComission = amountTotal.map((num, idx) => {
      return num - vendorAmount[idx];
    });

    return {
      data: totalComission,
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

  // Get total invoice by category
  getTotalInvoiceByCategory(invoices: Invoice[]): Chart {
    const labels = {
      espaco: 'Espaço',
      mobiliario: 'Mobiliário',
      buffet: 'Buffet',
      VISITED: 'Visitado'
    };

    // Get Category
    const category = invoices.map((a) => a.VENDOR_CATEGORY);
    const invoiceCategory = category.filter((x, i) => category.indexOf(x) === i);

    const totalInvoices = invoiceCategory.map((a) => (
      invoices.filter((p) => p.VENDOR_CATEGORY === a)
      .map((i) => i.AMOUNT).reduce((total, num) => Math.round(total + num))
    ));

    const translatedLabel = totalInvoices.map((k) => labels[k]);

    return {
      data: totalInvoices,
      labels: invoiceCategory,
    };
  }

  // Get total invoice by category
  getTotalComissionByCategory(invoices: Invoice[]): Chart {

    // Get Category
    const category = invoices.map((a) => a.VENDOR_CATEGORY);
    const invoiceCategory = category.filter((x, i) => category.indexOf(x) === i);

    const totalInvoices = invoiceCategory.map((a) => (
      invoices.filter((p) => p.VENDOR_CATEGORY === a)
      .map((i) => i.AMOUNT).reduce((total, num) => Math.round(total + num))
    ));

    const vendorAmount = invoiceCategory.map((a) => (
      invoices.filter((p) => p.VENDOR_CATEGORY === a)
      .map((i) => i.VENDOR_AMOUNT).reduce((total, num) => Math.round(total + num))
    ));

    const totalComission = totalInvoices.map((num, idx) => {
      return num - vendorAmount[idx];
    });

    return {
      data: totalComission,
      labels: invoiceCategory,
    };
  }

  // Get total appointments by status
  getTotalAppointmentsByStatus(appointments: Appointment[]): Chart {
    const labels = {
      CREATED: 'Criado',
      CANCELED: 'Cancelado',
      CONFIRMED: 'Confirmado',
      VISITED: 'Visitado'
    }
    // Get Status
    const status = appointments.map((a) => a.STATUS);
    const appointmentsStatus = status.filter((x, i) => status.indexOf(x) === i);

    const totalAppointment = appointmentsStatus.map((a) => (
      appointments.filter((p) => p.STATUS === a).length
    ));

    const translatedLabel = appointmentsStatus.map((k) => labels[k]);

    return {
      data: totalAppointment,
      labels: translatedLabel,
    };
  }

  getAppointmentsByCategory(appointments: Appointment[]): Chart {

    // Get Status
    const status = appointments.map((a) => a.VENDOR_CATEGORY);
    const appointmentsStatus = status.filter((x, i) => status.indexOf(x) === i);

    const totalAppointment = appointmentsStatus.map((a) => (
      appointments.filter((p) => p.VENDOR_CATEGORY === a).length
    ));

    return {
      data: totalAppointment,
      labels: appointmentsStatus,
    };
  }
}
