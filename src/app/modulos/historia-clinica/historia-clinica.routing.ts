import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarHistoriaClinicaComponent } from './componentes/actualizar-historia-clinica/actualizar-historia-clinica.component';
import { ListarHistoriaClinicaComponent } from './componentes/listar-historia-clinica/listar-historia-clinica.component';

const routes: Routes = [
    {path: 'listar', component: ListarHistoriaClinicaComponent, pathMatch: 'full'},    
    {path: 'editar/:pacienteId/:historiaClinicaId/:numeroHistoriaClinica', component: ActualizarHistoriaClinicaComponent, pathMatch: 'full'},
    { path: "",   
      redirectTo: 'listar', 
      pathMatch: 'full' 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriaClinicaRouting { }