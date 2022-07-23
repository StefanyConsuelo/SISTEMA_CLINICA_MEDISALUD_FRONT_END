import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarUsuarioComponent } from './componentes/listar-usuario/listar-usuario.component';
import { AngularMaterialModule } from 'src/app/compartido/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioRouting } from './usuario.routing';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';

@NgModule({
  declarations: [
    ListarUsuarioComponent,
    CrearUsuarioComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    UsuarioRouting
  ]
})
export class UsuarioModule { }
