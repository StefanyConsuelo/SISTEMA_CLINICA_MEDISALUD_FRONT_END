import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientosComponent } from './mantenimientos.component';
import { MantenimientosRouting } from './mantenimientos.routing';
import { AngularMaterialModule } from 'src/app/compartido/angular-material/angular-material.module';
import { ListarMedicamentosComponent } from './componentes-medicamentos/listar-medicamentos/listar-medicamentos.component';
import { CrearMedicamentosComponent } from './componentes-medicamentos/crear-medicamentos/crear-medicamentos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarAreaMedicasComponent } from './componentes-area-medica/listar-area-medicas/listar-area-medicas.component';
import { CrearAreaMedicaComponent } from './componentes-area-medica/crear-area-medica/crear-area-medica.component';
import { ListarServiciosEspecialidadComponent } from './componentes-servicio-especialidad/listar-servicios-especialidad/listar-servicios-especialidad.component';
import { CrearServiciosEspecialidadComponent } from './componentes-servicio-especialidad/crear-servicios-especialidad/crear-servicios-especialidad.component';



@NgModule({
  declarations: [
    MantenimientosComponent,
    ListarMedicamentosComponent,
    CrearMedicamentosComponent,
    ListarAreaMedicasComponent,
    CrearAreaMedicaComponent,
    ListarServiciosEspecialidadComponent,
    CrearServiciosEspecialidadComponent
  ],
  imports: [
    CommonModule,
    MantenimientosRouting,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MantenimientosModule { }
