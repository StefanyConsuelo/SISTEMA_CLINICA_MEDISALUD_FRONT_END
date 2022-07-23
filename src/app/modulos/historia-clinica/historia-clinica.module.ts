import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarHistoriaClinicaComponent } from './componentes/listar-historia-clinica/listar-historia-clinica.component';
import { ActualizarHistoriaClinicaComponent } from './componentes/actualizar-historia-clinica/actualizar-historia-clinica.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/compartido/angular-material/angular-material.module';
import { HistoriaClinicaRouting } from './historia-clinica.routing';
import { HcCrearMotivoConsultaComponent } from './componentes/hc-crear-motivo-consulta/hc-crear-motivo-consulta.component';
import { HcListarMotivoConsultaComponent } from './componentes/hc-listar-motivo-consulta/hc-listar-motivo-consulta.component';
import { HcListarMedicacionComponent } from './componentes/hc-listar-medicacion/hc-listar-medicacion.component';
import { HcCrearMedicacionComponent } from './componentes/hc-crear-medicacion/hc-crear-medicacion.component';
import { HcCrearDetalleMedicacionComponent } from './componentes/hc-crear-detalle-medicacion/hc-crear-detalle-medicacion.component';
import { DatosGeneralesComponent } from './componentes/datos-generales/datos-generales.component';
import { HcAntecedentesComponent } from './componentes/hc-antecedentes/hc-antecedentes.component';
import { HcCrearExamenesComponent } from './componentes/hc-crear-examenes/hc-crear-examenes.component';
import { HcListarExamenesComponent } from './componentes/hc-listar-examenes/hc-listar-examenes.component';
import { HcEditarResultadoExamenComponent } from './componentes/hc-listar-examenes/hc-editar-resultado-examen/hc-editar-resultado-examen.component';
import { HcTriajeComponent } from './componentes/hc-triaje/hc-triaje.component';



@NgModule({
  declarations: [
    ListarHistoriaClinicaComponent,
    ActualizarHistoriaClinicaComponent,
    HcCrearMotivoConsultaComponent,
    HcListarMotivoConsultaComponent,
    HcListarMedicacionComponent,
    HcCrearMedicacionComponent,
    HcCrearDetalleMedicacionComponent,
    DatosGeneralesComponent,
    HcAntecedentesComponent,
    HcCrearExamenesComponent,
    HcListarExamenesComponent,
    HcEditarResultadoExamenComponent,
    HcTriajeComponent
  ],
  imports: [
    CommonModule,
    HistoriaClinicaRouting,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class HistoriaClinicaModule { }
