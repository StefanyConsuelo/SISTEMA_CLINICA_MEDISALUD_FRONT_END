import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from './componentes/listar-usuario/listar-usuario.component';

const routes: Routes = [
    {path: 'listar', component: ListarUsuarioComponent, pathMatch: 'full'},
    {path: 'crear', component: CrearUsuarioComponent, pathMatch: 'full'},
    {path: 'crear/:id', component: CrearUsuarioComponent, pathMatch: 'full'},
    { path: "",   
      redirectTo: 'listar', 
      pathMatch: 'full' 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRouting { }