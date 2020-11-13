import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material-module/material-module.module';
import { CardComponent } from './components/card/card.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
  declarations: [
    CardComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    CardComponent,
    SideMenuComponent
  ]
})
export class SharedModule { }
