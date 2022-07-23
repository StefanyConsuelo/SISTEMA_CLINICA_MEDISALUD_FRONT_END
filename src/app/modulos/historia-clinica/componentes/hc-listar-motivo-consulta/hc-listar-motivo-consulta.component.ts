import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MotivoConsultaModel } from 'src/app/definiciones/motivo-consulta.model';
import { MotivoConsultaService } from 'src/app/servicios/motivo-consulta.service';

@Component({
  selector: 'app-hc-listar-motivo-consulta',
  templateUrl: './hc-listar-motivo-consulta.component.html',
  styleUrls: ['./hc-listar-motivo-consulta.component.css']
})
export class HcListarMotivoConsultaComponent implements OnInit {

  totalFilas: number = 0;
  cargando : boolean = false;
  mensajeCarga : string = "Cargando datos...";
  dataSource: MotivoConsultaModel [] = [];
  columnas: string[] = ["tipo_enfermedad", "sintomas_principales", "relato", 
    "apetito", "sedantes", "orina" ];

  @ViewChild(MatTable) matTableMotivoConsulta: MatTable<MotivoConsultaModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private motivoConsultaService: MotivoConsultaService
  ) { }

  ngOnInit(): void {
    
  }

  async ngAfterViewInit(): Promise<void> {
    this.paginator._intl.itemsPerPageLabel = "Cantidad de items por página";
    this.cargarDatos(null);
  }

  async cargarDatos( eventData ): Promise<void>{
    this.cargando = true;
    let datasetHistoriaClinicaId = document.getElementById("historiaClinicaId").dataset.historiaclinicaid;
    const res = await this.motivoConsultaService.listar({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "objeto": {
        "historiaClinicaId": datasetHistoriaClinicaId
      }
    });

    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;      
  }

  getNewInstanceMotivoConsulta1(): MotivoConsultaModel{
    let mc = new MotivoConsultaModel();
    mc.tipoEnfermedad = "Gastritis";
    mc.sintomasPrincipales = "dolor de barriga";
    mc.relato = "el paciente muestra dolores fuertes";
    mc.apetito = "poco apetito";
    mc.sedantes = "ninguno";
    mc.orina = "sin datos";
    return mc;
  }

  getNewInstanceMotivoConsulta2(): MotivoConsultaModel{
    let mc = new MotivoConsultaModel();
    mc.tipoEnfermedad = "Gastritis";
    mc.sintomasPrincipales = "dolor de barriga fuerte";
    mc.relato = "el paciente muestra dolores fuertes que tiene que tomar una pastila para que pueda calmar el dolor porque si no es permanente";
    mc.apetito = "muy poco apetito";
    mc.sedantes = "ninguno";
    mc.orina = "sin datos";
    return mc;
  }

}
