import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorComponent } from './componentes/contenedor/contenedor.component';

const routes: Routes = [
  {path: 'principal', component: ContenedorComponent, pathMatch: 'full'},  
  { path: "",   
    redirectTo: '/reporte/principal', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRouting { }