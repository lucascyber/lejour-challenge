import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { WenddingService } from './services/wendding.service';
import { AppointmentService } from './services/appointment.service';



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
    AppointmentService
  ]
})
export class CoreModule { }
