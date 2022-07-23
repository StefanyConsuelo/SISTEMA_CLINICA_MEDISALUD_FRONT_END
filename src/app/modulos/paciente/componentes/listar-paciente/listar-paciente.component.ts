import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PacienteModel } from 'src/app/definiciones/paciente.model';
import { LoginService } from 'src/app/servicios/login.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.css']
})
export class ListarPacienteComponent implements OnInit {

  columnas: string[] = ['nombres', 'paterno','materno','tipo_documento','numero_documento', 'celular','acciones'];
  dataSource = [];
  totalFilas = 0;

  cargando: boolean = true;
  mensajeCarga: string = "Cargando datos...";
  query: string = "";

  @ViewChild(MatTable) matTablePaciente: MatTable<PacienteModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( 
    private pacienteService: PacienteService,
    private authService: LoginService
  ) { }

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    this.paginator._intl.itemsPerPageLabel = "Cantidad de items por página";
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void>{

    this.cargando = true;
    const res = await this.pacienteService.listar({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "query": ""
    });

    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }

  async eliminar( pacienteId:number, nombres:string ): Promise<void>{

    Swal.fire({
      title: `Seguro desea eliminar al paciente ${nombres}?`,
      text: 'Al presionar si, se procede a eliminar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar.',
      cancelButtonText: 'No, cancelar'
    }).then( async (result) => {
      if (result.value) {
        try {
          this.cargando = true;
          this.mensajeCarga = "Eliminando...";
          const res = await this.pacienteService.eliminar(pacienteId);
          this.paginator.pageIndex = 0;
          this.cargarDatos();          
          Swal.fire('Eliminado!','Se eliminó correctamente.','success');
        } catch (error) {
          Swal.fire('Error!','hubo un problema al eliminar.','error');
        }
      }
    });
  }

  tienePermisoRol( codigoRol:string, codigoModulo: string ): boolean{
    const tienePermiso = this.authService.validarPermisoRol(codigoRol, codigoModulo);
    return tienePermiso;
  }

  async filtrar(): Promise<void>{
    this.cargando = true;
    const res = await this.pacienteService.listar({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "query": this.query
    });

    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }
}
