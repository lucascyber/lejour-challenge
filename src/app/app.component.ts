import { Component, OnInit } from '@angular/core';
import { AppointmentService } from './core/services/appointment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lejour-dashboard';

  constructor(private appointmentsService: AppointmentService) {

  }

  ngOnInit() {
    this.appointmentsService.getAppointments({}).subscribe((invoice) => {
      const cat = invoice.map((x) => x.STATUS);
      console.log(cat.filter((x, i) => cat.indexOf(x) === i));
    });
  }
}
