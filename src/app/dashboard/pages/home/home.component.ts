import { Component, OnInit } from '@angular/core';
import { CardRadiusOptions } from '../../../shared/components/card/card.enum';
import { Invoice } from '../../../core/models/invoice.model';
import { InvoiceService } from '../../../core/services/invoice.service';
import { AppointmentService } from '../../../core/services/appointment.service';
import { Appointment } from '../../../core/models/appointment.model';
import { Status } from '../../../core/enum/status.enum';
import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../core/models/user.model';
import { ChartsService } from 'src/app/core/services/charts.service';
import { Chart } from '../../../core/models/chart.model';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * PIE CHART
   */

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255, 184, 84, 0.5)',
        'rgba(132, 184, 226, 0.5)',
        'rgba(104, 191, 183, 0.5)',
        'rgba(219, 93, 121, 0.5)'
      ],
      borderColor: [
        'rgb(255, 184, 84)',
        'rgb(132, 184, 226)',
        'rgb(104, 191, 183)',
        'rgb(219, 93, 121)',
      ],
      borderWidth: 1
    },
  ];


  /**
   * CHART BAR OPTIONS
   */

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [{ data: [], label: 'Vendas' }];
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(226, 100, 90, 0.5)',
      borderColor: 'rgb(226, 100, 90)',
      borderWidth: 1
    }];

  cardRadius = {
    small: CardRadiusOptions.Small,
    big: CardRadiusOptions.Big,
    modal: CardRadiusOptions.Modal
  };

  invoicesData: Invoice[];
  appointmentaData: Appointment[];
  usersData: User[];

  sumaryData = {
    totalSales: 0,
    totalAppointments: 0,
    totalClients: 0,
  };

  chatBarData: Chart;

  constructor(
    private invoiceService: InvoiceService,
    private appointmentService: AppointmentService,
    private userService: UsersService,
    public chartsService: ChartsService,
  ) { }

  ngOnInit() {

    // Get Invoice data
    this.invoiceService.getInvoices({})
      .subscribe((invoices) => {
        this.invoicesData = invoices;
        // Set total amount
        this.sumaryData.totalSales = invoices.map((s) => s.AMOUNT).reduce((total, num) => total + num);
        this.barChartData[0].data = this.chartsService.filterTotalSalesByYear(invoices).data;
        this.barChartLabels = this.chartsService.filterTotalSalesByYear(invoices).labels;
      });

    // Get Appointments
    this.appointmentService.getAppointments({})
      .subscribe((appointments) => {
        this.appointmentaData = appointments;

        // Set total apointments data
        this.sumaryData.totalAppointments = appointments.filter((a) => (
          a.STATUS === Status.VISITED || a.STATUS === Status.CONFIRMED
        )).length;

        this.pieChartData = this.chartsService.getTotalAppointmentsByStatus(appointments).data;
        this.pieChartLabels = this.chartsService.getTotalAppointmentsByStatus(appointments).labels;
      });

    // Get Users
    this.userService.getUsers({})
      .subscribe((users) => {
        this.usersData = users;
        this.sumaryData.totalClients = users.length;
      });

  }

  getChartData(invoice: Invoice[]): Chart {
    return this.chartsService.filterTotalSalesByYear(invoice);
  }

}
