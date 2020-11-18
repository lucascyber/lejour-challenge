import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './services/users.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WenddingService } from './services/wendding.service';
import { AppointmentService } from './services/appointment.service';
import { WenddingFavoriteService } from './services/wendding-favorite.service';
import { InvoiceService } from './services/invoice.service';
import { ChartsService } from './services/charts.service';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';



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
    WenddingFavoriteService,
    ChartsService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ]
})
export class CoreModule { }
