import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAgendaComponent } from './listar-agenda/listar-agenda.component';

const routes: Routes = [
    {path: 'listar', component: ListarAgendaComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRouting { }