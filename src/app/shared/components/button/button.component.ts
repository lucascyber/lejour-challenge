import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonStyleOptions, ButtonTypes } from './button-options';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {
  @Input() value: string;
  @Input() type: ButtonTypes;
  @Input() name: string;
  @Input() text: string;
  @Input() buttonStyle: ButtonStyleOptions;
  @Input() isDisabled: boolean;

  buttonsStyles = {
    default: ButtonStyleOptions.Default,
    outlineGreen: ButtonStyleOptions.OutlineColor,
    outlineGrey: ButtonStyleOptions.OutlineGrey
  };

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.onClick.emit(this.value);
  }

}
