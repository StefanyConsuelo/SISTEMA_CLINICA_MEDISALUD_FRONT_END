import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { HistoriaClinicaModel } from 'src/app/definiciones/historia-clinica.model';
import { PacienteModel } from 'src/app/definiciones/paciente.model';
import { HistoriaClinicaService } from 'src/app/servicios/historia-clinica.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-listar-historia-clinica',
  templateUrl: './listar-historia-clinica.component.html',
  styleUrls: ['./listar-historia-clinica.component.css']
})
export class ListarHistoriaClinicaComponent implements OnInit {

  totalFilas: number = 0;
  cargando : boolean = false;
  mensajeCarga : string = "Cargando datos...";
  dataSource: HistoriaClinicaModel [] = [];
  columnas: string[] = ["numeroHistoriaClinica", "paciente", "tipo_documento", "numero_documento" ];
  query: string = "";

  @ViewChild(MatTable) matTablePaciente: MatTable<HistoriaClinicaModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private historiaClinicaService: HistoriaClinicaService,
    private authService: LoginService
  ) { 

    if(this.tienePermisoRol("ROLE_EDITAR_HISTORIA_CLINICA","HISTORIA_CLINICA"))
      this.columnas.push("acciones");
  }

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    this.paginator._intl.itemsPerPageLabel = "Cantidad de items por página";
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void>{

    this.cargando = true;

    const res = await this.historiaClinicaService.listarPaginado({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "query": ""
    });

    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }

  tienePermisoRol( codigoRol:string, codigoModulo: string ): boolean{
    const tienePermiso = this.authService.validarPermisoRol(codigoRol, codigoModulo);
    return tienePermiso;
  }

  getHistoriaClinica1(): HistoriaClinicaModel{
    let hc = new HistoriaClinicaModel();
    hc.historiaClinicaId = 1;
    hc.numeroHistoriaClinica = "HC001";
    hc.paciente = new PacienteModel();
    hc.paciente.nombres = "Raphael";
    hc.paciente.apellidoPaterno = "Roman";
    hc.paciente.apellidoMaterno = "Guerreros";
    hc.paciente.tipoDocumento = "DNI";
    hc.paciente.numeroDocumento = "49493893";
    return hc;
  }

  getHistoriaClinica2(): HistoriaClinicaModel{
    let hc = new HistoriaClinicaModel();
    hc.historiaClinicaId = 2;
    hc.numeroHistoriaClinica = "HC002";
    hc.paciente = new PacienteModel();
    hc.paciente.nombres = "Jahir";
    hc.paciente.apellidoPaterno = "San Roman";
    hc.paciente.apellidoMaterno = "Moriano";
    hc.paciente.tipoDocumento = "DNI";
    hc.paciente.numeroDocumento = "3535234";
    return hc;
  }

  getNombrePaciente( c:HistoriaClinicaModel ): string{
    if(c){
      if(c.paciente){
        return c.paciente.nombres + ", " + c.paciente.apellidoPaterno + " " + c.paciente.apellidoMaterno;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  async filtrar():Promise<void>{
    this.cargando = true;

    const res = await this.historiaClinicaService.listarPaginado({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "query": this.query
    });

    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }

}
