import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { chartBarConfig, pieChartConfig } from 'src/app/core/enum/months.enum';
import { CardRadiusOptions } from 'src/app/shared/components/card/card.enum';
import { Appointment } from '../../../core/models/appointment.model';
import { AppointmentService } from '../../../core/services/appointment.service';
import { ChartsService } from '../../../core/services/charts.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {

  cardRadius = {
    small: CardRadiusOptions.Small,
    big: CardRadiusOptions.Big,
    modal: CardRadiusOptions.Modal
  };

  yearSelection = '2020';
  yearSelectionStructure = [];
  currentyear = 0;

  /**
   * Chart PIE Status
   */

  public pieChartOptions: ChartOptions = pieChartConfig;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public statusChartLabel: Label[] = [];
  public statusChartData: number[] = [];
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255, 184, 84, 0.5)',
        'rgba(132, 184, 226, 0.5)',
        'rgba(104, 191, 183, 0.5)',
        'rgba(234, 128, 121, 0.5)',
        'rgba(134, 208, 203, 0.5)',
        'rgba(226, 100, 90, 0.5)',
        'rgba(219, 93, 121, 0.5)',
        'rgba(255, 184, 84, 0.5)',
        'rgba(132, 184, 226, 0.5)',
        'rgba(104, 191, 183, 0.5)',
        'rgba(234, 128, 121, 0.5)',
        'rgba(134, 208, 203, 0.5)',
        'rgba(226, 100, 90, 0.5)',
        'rgba(219, 93, 121, 0.5)',
      ],
    },
  ];

  public categoryChartLabel: Label[] = [];
  public categoryChartData: number[] = [];
  public categoryChartColors = [
    {
      backgroundColor: [
        'rgba(255, 184, 84, 0.5)',
        'rgba(132, 184, 226, 0.5)',
        'rgba(104, 191, 183, 0.5)',
        'rgba(226, 100, 90, 0.5)',
        'rgba(132, 184, 226, 0.5)'
      ],
    },
  ];

  /**
   * CHART BAR MONTHS
   */

  public barChartOptions: ChartOptions = chartBarConfig;
  public monthsChartLabel: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;

  public monthsChartData: ChartDataSets[] = [{ data: [], label: 'Vendas' }];
  public monthsChartColor: Array<any> = [
    { // first color
      backgroundColor: 'rgba(104, 191, 183, 0.5)',
      borderColor: 'rgb(104, 191, 183)',
      borderWidth: 1
    }];

  appointmentsData: Appointment[];

  constructor(
    private appointmentService: AppointmentService,
    private chartService: ChartsService
  ) { }

  ngOnInit() {
    this.appointmentService.getAppointments({})
      .subscribe((appointments) => {
        this.appointmentsData = appointments;

        // Set status chart
        this.statusChartData = this.chartService.getTotalAppointmentsByStatus(appointments).data;
        this.statusChartLabel = this.chartService.getTotalAppointmentsByStatus(appointments).labels;

        // Set category chart
        this.categoryChartData = this.chartService.getAppointmentsByCategory(appointments).data;
        this.categoryChartLabel = this.chartService.getAppointmentsByCategory(appointments).labels;

        // Month Chart
        this.yearSelectionStructure = this.chartService.filterAppointmentsYears(appointments);
        this.monthsChartData[0].data = this.chartService.getAppointmentByMonths(appointments, this.yearSelectionStructure[0]).data;
        this.monthsChartLabel = this.chartService.getAppointmentByMonths(appointments, this.yearSelectionStructure[0]).labels;
        this.currentyear = this.yearSelectionStructure[0];
      });
  }

  filterByMonths(value) {
    this.monthsChartData[0].data = this.chartService.getAppointmentByMonths(this.appointmentsData, value).data;
    this.currentyear = value;
    this.monthsChartLabel = this.chartService.getAppointmentByMonths(this.appointmentsData, value).labels;
  }

}
