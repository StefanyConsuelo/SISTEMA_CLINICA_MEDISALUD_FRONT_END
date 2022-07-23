import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/servicios/reportes.service';

@Component({
  selector: 'app-reporte-cant-personal-medico',
  templateUrl: './reporte-cant-personal-medico.component.html',
  styleUrls: ['./reporte-cant-personal-medico.component.css']
})
export class ReporteCantPersonalMedicoComponent implements OnInit {

  totales:number = 0;

  constructor(
    private reporteService: ReportesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void> {
    this.totales = await this.reporteService.reporteCantidadTotalPersonalMedicoAnualmente();
  }

}
