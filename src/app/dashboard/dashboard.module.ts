import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashTemplateComponent } from './dash-template/dash-template.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CasamentosComponent } from './pages/casamentos/casamentos.component';
import { VendasComponent } from './pages/vendas/vendas.component';


@NgModule({
  declarations: [
    DashTemplateComponent,
    HomeComponent,
    AgendamentoComponent,
    ClientesComponent,
    CasamentosComponent,
    VendasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
