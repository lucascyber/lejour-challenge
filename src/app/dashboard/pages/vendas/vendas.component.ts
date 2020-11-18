import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../core/services/invoice.service';
import { ChartsService } from '../../../core/services/charts.service';
import { CardRadiusOptions } from 'src/app/shared/components/card/card.enum';
import { Invoice } from '../../../core/models/invoice.model';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { chartBarConfig } from '../../../core/enum/months.enum';

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

  constructor(
    private invoiceService: InvoiceService,
    private chartsService: ChartsService
  ) { }

   /**
   * CHART BAR MONTHS
   */

  public barChartOptions: ChartOptions = chartBarConfig;
  public monthsChartLabel: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public monthsChartData: ChartDataSets[] = [{ data: [], label: 'Vendas' }];
  public monthsChartColor: Array<any> = [
    { // first color
      backgroundColor: 'rgba(226, 100, 90, 0.5)',
      borderColor: 'rgb(226, 100, 90)',
      borderWidth: 1
    }];

  ngOnInit() {
    this.invoiceService.getInvoices({})
      .subscribe((invoices) => {
        this.invoiceData = invoices;

        // Set the selected options
        this.yearSelectionStructure = this.chartsService.filterTotalSalesByYear(invoices).labels;

        // Set chart contig
        this.monthsChartData[0].data = this.chartsService.filterTotalSalesByMonths(invoices, 2020).data;
        this.monthsChartData[0].label = 'Vendas 2020';
        this.monthsChartLabel = this.chartsService.filterTotalSalesByMonths(invoices, 2020).labels;
      });
  }

  filterByMonths(value) {
    this.monthsChartData[0].data = this.chartsService.filterTotalSalesByMonths(this.invoiceData, value).data;
    this.monthsChartData[0].label = `Vendas ${value}`;
    this.monthsChartLabel = this.chartsService.filterTotalSalesByMonths(this.invoiceData, value).labels;
  }

}
