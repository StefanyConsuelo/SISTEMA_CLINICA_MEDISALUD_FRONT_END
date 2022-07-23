import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/servicios/reportes.service';

@Component({
  selector: 'app-reporte-cant-pacientes',
  templateUrl: './reporte-cant-pacientes.component.html',
  styleUrls: ['./reporte-cant-pacientes.component.css']
})
export class ReporteCantPacientesComponent implements OnInit {

  totales:number = 0;

  constructor(
    private reporteService: ReportesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void> {
    this.totales = await this.reporteService.reporteCantidadTotalPacientesAnualmente();
  }

}
