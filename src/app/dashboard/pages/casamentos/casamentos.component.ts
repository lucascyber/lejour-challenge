import { Component, OnInit, ViewChild } from '@angular/core';
import { Wendding } from 'src/app/core/models/wendding.model';
import { WenddingService } from 'src/app/core/services/wendding.service';
import { CardRadiusOptions } from 'src/app/shared/components/card/card.enum';
import { ChartsService } from 'src/app/core/services/charts.service';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-casamentos',
  templateUrl: './casamentos.component.html',
  styleUrls: ['./casamentos.component.scss']
})
export class CasamentosComponent implements OnInit {

  @ViewChild(MatMenuTrigger, {static: true}) menuMeses: MatMenuTrigger;
  @ViewChild(MatMenuTrigger, {static: true}) menuConvidados: MatMenuTrigger;

  cardRadius = {
    small: CardRadiusOptions.Small,
    big: CardRadiusOptions.Big,
    modal: CardRadiusOptions.Modal
  };
  
  byMonthCurrentYear: string = '2020';
  byGuestsCurrentYear: string = '2020';

  weddingData: Wendding[];
  weddingYears = Array<number>();

  // By Month Bar Chart
  public byMonthChartOptions: ChartOptions = {

    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
        suggestedMin: 0
      }
    }]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public byMonthChartLabels: Label[] = [];
  public byMonthChartLegend = false;
  public byMonthChartType: ChartType = 'bar';
  public byMonthChartData: ChartDataSets[] = [{ data: [], label: 'Casamentos' }];

  public byMonthChartColors: Array<any> = [
    { 
      backgroundColor: 'rgba(226, 100, 90, 0.5)',
      borderColor: 'rgb(226, 100, 90)',
      borderWidth: 1
    }];

  // By Style Pie Chart
  public byStyleChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
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
  public byStyleChartLabels: Label[] = [];
  public byStyleChartType: ChartType = 'pie';
  public byStyleChartData: ChartDataSets[] = [{ data: [], label: 'Estilos de casamento' }];
  public byStyleChartLegend = true;
  public byStyleChartColors = [
    { // first color
      backgroundColor: 'rgba(226, 100, 90, 0.5)',
      borderColor: 'rgb(226, 100, 90)',
      borderWidth: 1
    }];
    
  

  // By Guest Quantity Bar Chart 
  public byGuestChartOptions: ChartOptions = {

    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
        min: 0,
        suggestedMax: 5
      }
    }]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public byGuestChartLabels: Label[] = [];
  public byGuestChartLegend = false;
  public byGuestChartType: ChartType = 'bar';
  public byGuestChartData: ChartDataSets[] = [{ data: [], label: 'Quantidade de casamentos' }];

  public byGuestChartColors: Array<any> = [
    { 
      backgroundColor: 'rgba(226, 100, 90, 0.5)',
      borderColor: 'rgb(226, 100, 90)',
      borderWidth: 1
    }];

  // By Vendor Pie Chart
  public byVendorChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
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
  public byVendorChartLabels: Label[] = [];
  public byVendorChartType: ChartType = 'pie';
  public byVendorChartData: ChartDataSets[] = [{ data: [], label: 'Estilos de casamento' }];
  public byVendorChartLegend = true;
  public byVendorChartColors = [
    { // first color
      backgroundColor: 'rgba(226, 100, 90, 0.5)',
      borderColor: 'rgb(226, 100, 90)',
      borderWidth: 1
    }];

  constructor(
    private weddingService: WenddingService,
    private chartsService: ChartsService
    ) { }

  ngOnInit() {
    // Get Wedding Data
    this.weddingService.getWenddings({})
      .subscribe((weddings) => {
        // Bar Chart by Month
        console.log(weddings);
        this.weddingData = weddings;
        this.weddingYears = this.chartsService.filterWeddingYears(weddings);
        const chartByMonth = this.chartsService.filterTotalWeddingsByMonth(this.weddingData);
        this.byMonthChartData[0].data = chartByMonth.data;
        this.byMonthChartLabels = chartByMonth.labels;

        // Bar Chart by Style
        const chartByStyle = this.chartsService.filterWeddingsByStyle(weddings);
        this.byStyleChartData[0].data = chartByStyle.data;
        this.byStyleChartLabels = chartByStyle.labels;

        // Bar Chart by Guest
        const chartByGuest = this.chartsService.filterWeddingsByGuests(weddings);
        this.byGuestChartData[0].data = chartByGuest.data;
        this.byGuestChartLabels = chartByGuest.labels;
      });
  }

  getYearValue(filterValue: any, chartName: string): void {
    if (chartName === 'month') {
      const chartData = this.chartsService.filterTotalWeddingsByMonth(this.weddingData, parseInt(filterValue.currentTarget.innerText));
      this.byMonthChartData[0].data = chartData.data;
      this.byMonthChartLabels = chartData.labels;
      this.byMonthCurrentYear = filterValue.currentTarget.innerText;
    } else if (chartName === 'guests') {
      const chartData = this.chartsService.filterWeddingsByGuests(this.weddingData, parseInt(filterValue.currentTarget.innerText));
      this.byGuestChartData[0].data = chartData.data;
      this.byGuestChartLabels = chartData.labels;
      this.byGuestsCurrentYear = filterValue.currentTarget.innerText;
    }
  }
}
