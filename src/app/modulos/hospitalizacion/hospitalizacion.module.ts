import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarHospitalizacionComponent } from './componentes/listar-hospitalizacion/listar-hospitalizacion.component';
import { HospitalizacionRouting } from './hospitalizacion.routing';
import { AngularMaterialModule } from 'src/app/compartido/angular-material/angular-material.module';
import { CrearHospitalizacionComponent } from './componentes/crear-hospitalizacion/crear-hospitalizacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditHospitalizacionComponent } from './componentes/edit-hospitalizacion/edit-hospitalizacion.component';

@NgModule({
  declarations: [
    ListarHospitalizacionComponent,
    CrearHospitalizacionComponent,
    EditHospitalizacionComponent
  ],
  imports: [
    CommonModule,
    HospitalizacionRouting,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HospitalizacionModule { }
