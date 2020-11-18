import { Component, OnInit } from '@angular/core';
import { Wendding } from 'src/app/core/models/wendding.model';
import { WenddingService } from 'src/app/core/services/wendding.service';
import { CardRadiusOptions } from 'src/app/shared/components/card/card.enum';
import { ChartsService } from 'src/app/core/services/charts.service';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-casamentos',
  templateUrl: './casamentos.component.html',
  styleUrls: ['./casamentos.component.scss']
})
export class CasamentosComponent implements OnInit {

  cardRadius = {
    small: CardRadiusOptions.Small,
    big: CardRadiusOptions.Big,
    modal: CardRadiusOptions.Modal
  };
  
  weddingData: Wendding[];

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [{ data: [], label: 'Casamentos' }];
  public chartColors: Array<any> = [
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
    // Get Wedding data
    this.weddingService.getWenddings({})
      .subscribe((weddings) => {
        this.weddingData = weddings;
        this.barChartData[0].data = this.chartsService.filterTotalWeddingsByYear(weddings).data;
        this.barChartLabels = this.chartsService.filterTotalWeddingsByYear(weddings).labels;
      });
  }

}
