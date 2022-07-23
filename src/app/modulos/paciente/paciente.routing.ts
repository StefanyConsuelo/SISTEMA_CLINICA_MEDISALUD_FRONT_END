import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPacienteComponent } from './componentes/crear-paciente/crear-paciente.component';
import { ListarPacienteComponent } from './componentes/listar-paciente/listar-paciente.component';

const routes: Routes = [
    {path: 'listar', component: ListarPacienteComponent, pathMatch: 'full'},
    {path: 'crear', component: CrearPacienteComponent, pathMatch: 'full'},
    {path: 'crear/:id', component: CrearPacienteComponent, pathMatch: 'full'},
    { path: "",   
      redirectTo: 'listar', 
      pathMatch: 'full' 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRouting { }