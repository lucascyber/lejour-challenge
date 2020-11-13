import { Component, Input, OnInit } from '@angular/core';
import { CardRadiusOptions } from './card.enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() radius: CardRadiusOptions;

  cardRadius = {
    bigRadius: CardRadiusOptions.Big,
    smallRadius: CardRadiusOptions.Small
  };

  constructor() { }

  ngOnInit() {
  }

}
