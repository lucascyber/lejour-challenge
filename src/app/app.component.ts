import { Component } from '@angular/core';
import { ButtonTypes, ButtonStyleOptions } from './shared/components/button/button-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lejour-dashboard';
  buttonOptions = ButtonTypes.Button;
  buttonStyle = ButtonStyleOptions.Default;

  print(event) {
    console.log(event);
  }
}
