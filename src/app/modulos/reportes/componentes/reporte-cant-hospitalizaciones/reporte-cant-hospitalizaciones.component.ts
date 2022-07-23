import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/servicios/reportes.service';

@Component({
  selector: 'app-reporte-cant-hospitalizaciones',
  templateUrl: './reporte-cant-hospitalizaciones.component.html',
  styleUrls: ['./reporte-cant-hospitalizaciones.component.css']
})
export class ReporteCantHospitalizacionesComponent implements OnInit {

  totales:number = 0;

  constructor(
    private reporteService: ReportesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void> {
    this.totales = await this.reporteService.reporteCantidadTotalHospitalizacionAnualmente();
  }

}
