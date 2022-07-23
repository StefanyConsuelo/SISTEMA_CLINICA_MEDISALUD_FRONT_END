import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarPacienteComponent } from './componentes/listar-paciente/listar-paciente.component';
import { AngularMaterialModule } from 'src/app/compartido/angular-material/angular-material.module';
import { PacienteRouting } from './paciente.routing';
import { CrearPacienteComponent } from './componentes/crear-paciente/crear-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListarPacienteComponent,
    CrearPacienteComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PacienteRouting,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PacienteModule { }
