import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/servicios/reportes.service';

@Component({
  selector: 'app-reporte-cant-citas-medicas',
  templateUrl: './reporte-cant-citas-medicas.component.html',
  styleUrls: ['./reporte-cant-citas-medicas.component.css']
})
export class ReporteCantCitasMedicasComponent implements OnInit {

  totales:number = 0;

  constructor(
    private reporteService: ReportesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void> {
    this.totales = await this.reporteService.reporteCantidadTotalCitasAnualmente();
  }
}
