import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurarHorarioPersonalMedicoComponent } from './componentes/configurar-horario-personal-medico/configurar-horario-personal-medico.component';
import { CrearPersonalMedicoComponent } from './componentes/crear-personal-medico/crear-personal-medico.component';
import { ListarPersonalMedicoComponent } from './componentes/listar-personal-medico/listar-personal-medico.component';

const routes: Routes = [
  {path: 'listar', component: ListarPersonalMedicoComponent, pathMatch: 'full'},
  {path: 'crear', component: CrearPersonalMedicoComponent, pathMatch: 'full'},
  {path: 'crear/:id', component: CrearPersonalMedicoComponent, pathMatch: 'full'},
  {path: 'configurar/:id', component: ConfigurarHorarioPersonalMedicoComponent, pathMatch: 'full'},
  { path: "",   
    redirectTo: 'listar', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalMedicoRouting { }