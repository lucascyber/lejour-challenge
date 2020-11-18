import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../core/services/invoice.service';
import { ChartsService } from '../../../core/services/charts.service';
import { CardRadiusOptions } from 'src/app/shared/components/card/card.enum';
import { Invoice } from '../../../core/models/invoice.model';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { chartBarConfig, pieChartConfig } from '../../../core/enum/months.enum';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  cardRadius = {
    small: CardRadiusOptions.Small,
    big: CardRadiusOptions.Big,
    modal: CardRadiusOptions.Modal
  };

  invoiceData: Invoice[];

  yearSelection = '2020';
  yearSelectionStructure = [];

  currentMonthYear = 0;
  currentComissionYear = 0;

  constructor(
    private invoiceService: InvoiceService,
    private chartsService: ChartsService
  ) { }

  /**
   * Chart PIE Category
   */

  public pieChartOptions: ChartOptions = pieChartConfig;
  public categoryChartLabel: Label[] = [];
  public categoryChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  // public pieChartPlugins = [pluginDataLabels];
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
      borderColor: [
        'rgb(255, 184, 84)',
        'rgb(132, 184, 226)',
        'rgb(104, 191, 183)',
        'rgb(234, 128, 121)',
        'rgb(134, 208, 203)',
        'rgb(226, 100, 90)',
        'rgb(219, 93, 121)',
        'rgb(255, 184, 84)',
        'rgb(132, 184, 226)',
        'rgb(104, 191, 183)',
        'rgb(234, 128, 121)',
        'rgb(134, 208, 203)',
        'rgb(226, 100, 90)',
        'rgb(219, 93, 121)',
      ],
      borderWidth: 1
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

  /**
   * CHART BAR COMISSION MONTHS
   */
  public comissionMonthsChartData: ChartDataSets[] = [{ data: [], label: 'Vendas' }];
  public comissionMonthsChartLabel: Label[] = [];
  public comissionMonthsChartColor: Array<any> = [
    { // first color
      backgroundColor: 'rgba(132, 184, 226, 0.5)',
      borderColor: 'rgb(132, 184, 226)',
      borderWidth: 1
    }];

  /**
   * Chart PIE Comission Category
   */
  public comissionCategoryLabel: Label[] = [];
  public comissionCategoryData: number[] = [];

  // public pieChartPlugins = [pluginDataLabels];
  public comissionCategoryColors = [
    {
      backgroundColor: [
        'rgba(219, 93, 121, 0.5)',
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
      borderColor: [
        'rgb(219, 93, 121)',
        'rgb(132, 184, 226)',
        'rgb(104, 191, 183)',
        'rgb(234, 128, 121)',
        'rgb(134, 208, 203)',
        'rgb(226, 100, 90)',
        'rgb(219, 93, 121)',
        'rgb(255, 184, 84)',
        'rgb(132, 184, 226)',
        'rgb(104, 191, 183)',
        'rgb(234, 128, 121)',
        'rgb(134, 208, 203)',
        'rgb(226, 100, 90)',
        'rgb(219, 93, 121)',
      ],
      borderWidth: 1
    },
  ];

  ngOnInit() {
    this.invoiceService.getInvoices({})
      .subscribe((invoices) => {
        this.invoiceData = invoices;

        // Set Months the selected options
        this.yearSelectionStructure = this.chartsService.filterTotalSalesByYear(invoices).labels;

        this.currentMonthYear = 2020;
        this.currentComissionYear = 200;

        // Set Months chart contig
        this.monthsChartData[0].data = this.chartsService.filterTotalSalesByMonths(invoices, 2020).data;
        this.monthsChartData[0].label = 'Vendas 2020';
        this.monthsChartLabel = this.chartsService.filterTotalSalesByMonths(invoices, 2020).labels;

        // Set Comission Months chart config
        this.comissionMonthsChartData[0].data = this.chartsService.filterCommissionByMonths(invoices, 2020).data;
        this.comissionMonthsChartData[0].label = 'Vendas 2020';
        this.comissionMonthsChartLabel = this.chartsService.filterCommissionByMonths(invoices, 2020).labels;

        // Set Category Chart
        this.categoryChartData = this.chartsService.getTotalInvoiceByCategory(invoices).data;
        this.categoryChartLabel = this.chartsService.getTotalInvoiceByCategory(invoices).labels;

        // Set Comission Category Chart
        this.comissionCategoryData = this.chartsService.getTotalComissionByCategory(invoices).data;
        this.comissionCategoryLabel = this.chartsService.getTotalComissionByCategory(invoices).labels;
      });
  }

  filterByMonths(value) {
    this.monthsChartData[0].data = this.chartsService.filterTotalSalesByMonths(this.invoiceData, value).data;
    this.currentMonthYear = value;
    this.monthsChartLabel = this.chartsService.filterTotalSalesByMonths(this.invoiceData, value).labels;
  }

  filterComissionByMonths(value) {
    this.comissionMonthsChartData[0].data = this.chartsService.filterCommissionByMonths(this.invoiceData, value).data;
    this.currentComissionYear = value;
    this.comissionMonthsChartLabel = this.chartsService.filterCommissionByMonths(this.invoiceData, value).labels;
  }

}
