import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashTemplateComponent } from './dash-template/dash-template.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CasamentosComponent } from './pages/casamentos/casamentos.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashTemplateComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'agendamentos', component: AgendamentoComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'casamentos', component: CasamentosComponent },
      { path: 'vendas', component: VendasComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
