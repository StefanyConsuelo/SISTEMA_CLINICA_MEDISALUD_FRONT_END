import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { CitaMedicaModel } from 'src/app/definiciones/cita-medica.model';
import { CitaMedicaService } from 'src/app/servicios/cita-medica.service';
import { LoginService } from 'src/app/servicios/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-cita-medica',
  templateUrl: './listar-cita-medica.component.html',
  styleUrls: ['./listar-cita-medica.component.css']
})
export class ListarCitaMedicaComponent implements OnInit {

  cargando:boolean = false;
  mensajeCarga:string = "Cargando datos...";

  columnas: string[] = ['numero_cita', 'paciente','numero_documento','medico',
    'servicio', 'fecha_cita','hora_cita', 'estado', 'acciones'];
  dataSource:CitaMedicaModel[] = [];
  totalFilas = 0;
  query:string = "";

  @ViewChild(MatTable) matTablePaciente: MatTable<CitaMedicaModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( 
    private citaMedicaService: CitaMedicaService,
    private authService: LoginService ) { }

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    this.paginator._intl.itemsPerPageLabel = "Cantidad de items por página";
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void>{

    this.cargando = true;
    const res = await this.citaMedicaService.listarPaginado({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "query": ""
    });
    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }

  async eliminar( citaMedicaId:number, numeroCita:string ): Promise<void>{

    Swal.fire({
      title: `Seguro desea eliminar la cita médica Nro. ${numeroCita}?`,
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
          const res = await this.citaMedicaService.eliminar(citaMedicaId);
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
    const res = await this.citaMedicaService.listarPaginado({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "query": this.query
    });
    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }
}
