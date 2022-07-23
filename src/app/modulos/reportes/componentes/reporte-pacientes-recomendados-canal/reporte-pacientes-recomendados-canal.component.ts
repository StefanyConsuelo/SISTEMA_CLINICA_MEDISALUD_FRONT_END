import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReportesService } from 'src/app/servicios/reportes.service';
import * as pluginLabels from 'chartjs-plugin-labels';

@Component({
  selector: 'app-reporte-pacientes-recomendados-canal',
  templateUrl: './reporte-pacientes-recomendados-canal.component.html',
  styleUrls: ['./reporte-pacientes-recomendados-canal.component.css']
})
export class ReportePacientesRecomendadosCanalComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild("anio") anio: ElementRef;
  @Input() anios:number[] = [];

  anioActual: number = new Date().getFullYear();
  pieChartType: ChartType = 'pie';
  pieChartPlugins = [ pluginLabels ];
  pieChartOptions: ChartConfiguration['options'] = {
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
        align: 'center',
        position: "top"
      },
      
    },
  };

  pieChartData: ChartData<'pie'> = {
    labels: [ ],    
    datasets: [ ],
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
    const res = await this.reporteService.reportePacientesRecomendadosCanalAnualmente(anio);
    this.pieChartData.labels = [];
    this.pieChartData.datasets = [];
    this.pieChartData.datasets.push({data: []});    

    res.forEach( d => {
      this.pieChartData.labels.push([d.etiqueta]);
      this.pieChartData.datasets[0].data.push(d.cantidad);
    });

    this.chart.update();
  }
}
