import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearHospitalizacionComponent } from './componentes/crear-hospitalizacion/crear-hospitalizacion.component';
import { EditHospitalizacionComponent } from './componentes/edit-hospitalizacion/edit-hospitalizacion.component';
import { ListarHospitalizacionComponent } from './componentes/listar-hospitalizacion/listar-hospitalizacion.component';

const routes: Routes = [
    {path: 'listar', component: ListarHospitalizacionComponent, pathMatch: 'full'},
    {path: 'crear', component: CrearHospitalizacionComponent, pathMatch: 'full'},
    {path: 'editar', component: EditHospitalizacionComponent, pathMatch: 'full'},
    { path: "",   
      redirectTo: 'listar', 
      pathMatch: 'full' 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalizacionRouting { }