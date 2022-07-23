import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearCitaMedicaComponent } from './componentes/crear-cita-medica/crear-cita-medica.component';
import { CitaMedicaRouting } from './cita-medica.routing';
import { AngularMaterialModule } from 'src/app/compartido/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarCitaMedicaComponent } from './componentes/listar-cita-medica/listar-cita-medica.component';

@NgModule({
  declarations: [
    CrearCitaMedicaComponent,
    ListarCitaMedicaComponent
  ],
  imports: [
    CommonModule,
    CitaMedicaRouting,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CitaMedicaModule { }
