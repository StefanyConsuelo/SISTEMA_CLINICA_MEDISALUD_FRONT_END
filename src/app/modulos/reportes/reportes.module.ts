import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesRouting } from './reportes.routing';
import { NgChartsModule } from 'ng2-charts';
import { TestReportBarComponent } from './componentes/test-report-bar/test-report-bar.component';
import { ContenedorComponent } from './componentes/contenedor/contenedor.component';
import { ReportePacientesRegistradosComponent } from './componentes/reporte-pacientes-registrados/reporte-pacientes-registrados.component';
import { ReportePacientesRecomendadosCanalComponent } from './componentes/reporte-pacientes-recomendados-canal/reporte-pacientes-recomendados-canal.component';
import { ReporteCitasGeneradasComponent } from './componentes/reporte-citas-generadas/reporte-citas-generadas.component';
import { ReportePacientesHospitalizadosComponent } from './componentes/reporte-pacientes-hospitalizados/reporte-pacientes-hospitalizados.component';
import { ReporteServiciosSolicitadosComponent } from './componentes/reporte-servicios-solicitados/reporte-servicios-solicitados.component';
import { MatIconModule } from '@angular/material/icon';
import { ReporteCantPacientesComponent } from './componentes/reporte-cant-pacientes/reporte-cant-pacientes.component';
import { ReporteCantCitasMedicasComponent } from './componentes/reporte-cant-citas-medicas/reporte-cant-citas-medicas.component';
import { ReporteCantHospitalizacionesComponent } from './componentes/reporte-cant-hospitalizaciones/reporte-cant-hospitalizaciones.component';
import { ReporteCantPersonalMedicoComponent } from './componentes/reporte-cant-personal-medico/reporte-cant-personal-medico.component';

@NgModule({
  declarations: [
    TestReportBarComponent,
    ContenedorComponent,
    ReportePacientesRegistradosComponent,
    ReportePacientesRecomendadosCanalComponent,
    ReporteCitasGeneradasComponent,
    ReportePacientesHospitalizadosComponent,
    ReporteServiciosSolicitadosComponent,
    ReporteCantPacientesComponent,
    ReporteCantCitasMedicasComponent,
    ReporteCantHospitalizacionesComponent,
    ReporteCantPersonalMedicoComponent
  ],
  imports: [
    CommonModule,
    ReportesRouting,
    NgChartsModule,
    MatIconModule
  ]
})
export class ReportesModule { }
