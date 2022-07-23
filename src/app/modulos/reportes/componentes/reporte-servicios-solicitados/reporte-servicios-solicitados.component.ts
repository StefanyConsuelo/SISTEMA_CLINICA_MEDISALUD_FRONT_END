import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReportesService } from 'src/app/servicios/reportes.service';
import * as pluginLabels from 'chartjs-plugin-labels';
import { AreaMedicaModel } from 'src/app/definiciones/area-medica.model';
import { AreaMedicaService } from 'src/app/servicios/area-medica.service';

@Component({
  selector: 'app-reporte-servicios-solicitados',
  templateUrl: './reporte-servicios-solicitados.component.html',
  styleUrls: ['./reporte-servicios-solicitados.component.css']
})
export class ReporteServiciosSolicitadosComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() anios:number[] = [];
  @ViewChild("anio") anio: ElementRef;

  anioActual: number = new Date().getFullYear();
  areasMedicas: AreaMedicaModel[]=[];
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
    private areaMedicaService: AreaMedicaService,
    private reporteService: ReportesService
  ) { 
    
  }

  async ngOnInit(): Promise<void> {
    const res = await this.areaMedicaService.listarTodos();
    this.areasMedicas = res;
    this.cargarDatos( this.areasMedicas.length > 0 ? this.areasMedicas[0].areaMedicaId : 0);
  }

  async ngAfterViewInit(): Promise<void> {
    
  }

  async cargarDatos( pAreaMedicaId:number ): Promise<void>{
    const anio = this.anio.nativeElement.value;
    const res = await this.reporteService.reporteServiciosMasUtilizadosCitasAnualmente(anio, pAreaMedicaId);
    this.pieChartData.labels = [];
    this.pieChartData.datasets = [];
    this.pieChartData.datasets.push({data: []});    

    res.forEach( d => {
      this.pieChartData.labels.push([d.etiqueta]);
      this.pieChartData.datasets[0].data.push(d.cantidad);
    });

    this.chart.update();
  }

  parsearNumero( number:string): number {
    return parseInt(number);
  }
}
