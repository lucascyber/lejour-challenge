import { Component, OnInit } from '@angular/core';
import { AppointmentService } from './core/services/appointment.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lejour-dashboard';
  public itemMenu: any[] = [];

  constructor(
    private appointmentsService: AppointmentService
  ) {
    this.itemMenu = [
      {
        nome: 'Agendamentos',
        icone: 'icon-calendar',
        link: 'dashboard/agendamentos'
      },
      {
        nome: 'Clientes',
        icone: 'icon-clients',
        link: 'dashboard/clientes'
      },
      {
        nome: 'Casamentos',
        icone: 'icon-wending-1',
        link: 'dashboard/casamentos'
      },
      {
        nome: 'Vendas',
        icone: 'icon-comercial',
        link: 'dashboard/vendas'
      }
    ];
  }

  ngOnInit() {
    this.appointmentsService.getAppointments({}).subscribe((invoice) => {
      const cat = invoice.map((x) => x.STATUS);
    });
  }
}
