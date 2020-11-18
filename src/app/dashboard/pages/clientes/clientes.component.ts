//model
import { Status } from '../../../core/enum/status.enum';
import { Invoice } from '../../../core/models/invoice.model';
import { Appointment } from '../../../core/models/appointment.model';
import { User } from '../../../core/models/user.model';
import { Chart } from '../../../core/models/chart.model';


//service
import { AppointmentService } from '../../../core/services/appointment.service';
import { ChartsService } from '../../../core/services/charts.service';
import { InvoiceService } from '../../../core/services/invoice.service';
import { UsersService } from '../../../core/services/users.service';

//component
import { CardRadiusOptions } from '../../../shared/components/card/card.enum';

//package
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { group } from '@angular/animations';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
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
      backgroundColor: ['rgba(255, 184, 84, 0.5)', 'rgba(132, 184, 226, 0.5)', 'rgba(104, 191, 183, 0.5)', 'rgba(219, 93, 121, 0.5)'],
    },
  ];


  /**
   * CHART BAR OPTIONS
   */

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
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


  public usuariosDia: any = []
  public usuarios: User[] = []

  chatBarData: Chart;
  constructor(
    private invoiceService: InvoiceService,
    private appointmentService: AppointmentService,
    private userService: UsersService,
    public chartsService: ChartsService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }




  getUsers(): void {
    this.userService.getUsers({})
      .subscribe(
        (users) => {
          this.usuarios = users;
          this.sumaryData.totalClients = this.usuarios.length;

          const groups = users.reduce(
            (groups, usuarios) => {
              const date = new Date(usuarios.CREATED_AT.split(" ")[0]);
              console.log(new Date(date));

              for (var i = 2018; i <= 2020; i++) {
                groups[i] = [];
                for (var j = 1; j <= 12; j) {
                  group[i].push(j);
                  //for (var k = 1; k <= 31; k++) {
                  //  group[i].push(j);
                  //}
                }
              }



              if (!groups[date.getFullYear()]) {
                groups[date.getFullYear()] = [];

              }
              //groups[date.getFullYear()].pokemon = []
              //if (!groups[date.getFullYear()]date.getMonth()) {
              //  groups[date.getFullYear()].push(date.getMonth());
              //}
              //if (!groups[date.getFullYear()][date.getMonth()][date.getDate()]) {
              //  groups[date.getFullYear()][date.getMonth()][date.getDate()] = [];
              //}

              console.log(groups);
              //if (!groups[date.getFullYear()]) {
              //  groups[date.getFullYear()] = [];

              //  if (!groups[date.getMonth()]) {
              //    groups[date.getMonth()] = [];
              //  }


              //} else {
              //  if (!groups[date.getFullYear()]) {
              //    groups[date.getMonth()] = [];
              //  }

              //}
              //groups[date].push(usuarios);
              return groups;
            }, {});

          // Edit: to add it in the array format instead
          const groupArrays = Object.keys(groups)
            .map(
              (date) => {
                return {
                  date,
                  usuarios: groups[date]
                };
              });

          console.log(groupArrays);
          console.log(this.usuarios);
        }
      );



  }



  test() {

    //var result = _(arr)
    //  .groupBy(v => moment(v.created_at).format('MMMM'))
    //  .mapValues(v => _.map(v, 'name'))
    //  .value();

    //console.log(result);
  }


}
