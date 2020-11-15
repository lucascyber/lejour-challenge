import { Component, OnInit } from '@angular/core';
import { WenddingService } from './core/services/wendding.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lejour-dashboard';

  constructor(private wenddingService: WenddingService) {

  }

  ngOnInit() {
    this.wenddingService.getWenddings({id: '13', limit: '10'}).subscribe((wendding) => {
      console.log(wendding[0].OWNER_ID);
    });
  }
}
