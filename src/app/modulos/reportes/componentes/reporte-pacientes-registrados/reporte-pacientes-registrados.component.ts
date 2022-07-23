import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-annotation';
import { ReportesService } from 'src/app/servicios/reportes.service';

@Component({
  selector: 'app-reporte-pacientes-registrados',
  templateUrl: './reporte-pacientes-registrados.component.html',
  styleUrls: ['./reporte-pacientes-registrados.component.css']
})
export class ReportePacientesRegistradosComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() anios:number[] = [];
  @ViewChild("anio") anio: ElementRef;

  anioActual: number = new Date().getFullYear();
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  barChartType: ChartType = 'bar';
  barChartPlugins = [
    DataLabelsPlugin
  ];

  barChartData: ChartData<'bar'> = {
    labels: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' ],
    datasets: []
  };

  constructor(
    private reporteService: ReportesService
  ) { }

  ngOnInit(): void {}
  
  async ngAfterViewInit(): Promise<void> {
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void>{
    let anio = this.anio.nativeElement.value;
    const res = await this.reporteService.reportePacientesRegistradosAnualmente(anio);
    this.barChartData.datasets[0] = { data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Pacientes' };
    res.forEach( d => {
      this.barChartData.datasets[0].data[d.mes-1] = d.cantidad;
    });
    this.chart?.update();
  }
}
