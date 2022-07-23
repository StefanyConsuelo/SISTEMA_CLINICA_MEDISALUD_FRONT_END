import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCitaMedicaComponent } from './componentes/crear-cita-medica/crear-cita-medica.component';
import { ListarCitaMedicaComponent } from './componentes/listar-cita-medica/listar-cita-medica.component';

const routes: Routes = [
  { 
      path: 'crear',
      component: CrearCitaMedicaComponent, 
      pathMatch: 'full' 
  },
  { 
    path: 'listar',
    component: ListarCitaMedicaComponent, 
    pathMatch: 'full' 
  },
  { path: "",   
    redirectTo: 'listar', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitaMedicaRouting { }