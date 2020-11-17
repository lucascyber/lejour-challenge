import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material-module/material-module.module';
import { CardComponent } from './components/card/card.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { RouterModule } from '@angular/router';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { ChartBarComponent } from './components/chart-bar/chart-bar.component';

@NgModule({
  declarations: [
    CardComponent,
    SideMenuComponent,
    UserMenuComponent,
    ChartBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ChartsModule
  ],
  exports: [
    MaterialModule,
    CardComponent,
    SideMenuComponent,
    UserMenuComponent,
    ChartBarComponent,
    ChartsModule
  ],
  providers: [
    ThemeService
  ]
})
export class SharedModule { }
