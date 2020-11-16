import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { WenddingService } from './services/wendding.service';
import { AppointmentService } from './services/appointment.service';
import { WenddingFavoriteService } from './services/wendding-favorite.service';
import { InvoiceService } from './services/invoice.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    UsersService,
    WenddingService,
    AppointmentService,
    InvoiceService,
    WenddingFavoriteService
  ]
})
export class CoreModule { }
