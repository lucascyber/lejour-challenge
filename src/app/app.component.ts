import { Component } from '@angular/core';
import { CardRadiusOptions } from './shared/components/card/card.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lejour-dashboard';

  cardOption: CardRadiusOptions = CardRadiusOptions.Small;
}
