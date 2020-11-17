import { Component, OnInit } from '@angular/core';
import { CardRadiusOptions } from '../../../shared/components/card/card.enum';
import { Invoice } from '../../../core/models/invoice.model';
import { InvoiceService } from '../../../core/services/invoice.service';
import { AppointmentService } from '../../../core/services/appointment.service';
import { Appointment } from '../../../core/models/appointment.model';
import { Status } from '../../../core/enum/status.enum';
import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cardRadius = {
    small: CardRadiusOptions.Small,
    big: CardRadiusOptions.Big,
    modal: CardRadiusOptions.Modal
  };

  invoicesData: Invoice[];
  appointmentaData: Appointment[];
  usersData: User[];

  sumaryData = {
    totalSales: 0,
    totalAppointments: 0,
    totalClients: 0,
  };

  constructor(
    private invoiceService: InvoiceService,
    private appointmentService: AppointmentService,
    private userService: UsersService
  ) { }

  ngOnInit() {

    // Get Invoice data
    this.invoiceService.getInvoices({})
      .subscribe((invoices) => {
        this.invoicesData = invoices;
        // Set total amount
        this.sumaryData.totalSales = invoices.map((s) => s.AMOUNT).reduce((total, num) => total + num);
      });

    // Get Appointments
    this.appointmentService.getAppointments({})
      .subscribe((appointments) => {
        this.appointmentaData = appointments;

        // Set total apointments data
        this.sumaryData.totalAppointments = appointments.filter((a) => (
          a.STATUS === Status.VISITED || a.STATUS === Status.CONFIRMED
        )).length;
      });

    // Get Users
    this.userService.getUsers({})
      .subscribe((users) => {
        this.usersData = users;
        this.sumaryData.totalClients = users.length;
      });

  }

}
