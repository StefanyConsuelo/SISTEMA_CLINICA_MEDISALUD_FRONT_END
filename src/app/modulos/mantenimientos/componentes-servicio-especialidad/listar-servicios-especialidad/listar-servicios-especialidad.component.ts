import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { ServicioModel } from 'src/app/definiciones/servicio.model';
import { LoginService } from 'src/app/servicios/login.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2';
import { CrearServiciosEspecialidadComponent } from '../crear-servicios-especialidad/crear-servicios-especialidad.component';

@Component({
  selector: 'app-listar-servicios-especialidad',
  templateUrl: './listar-servicios-especialidad.component.html',
  styleUrls: ['./listar-servicios-especialidad.component.css']
})
export class ListarServiciosEspecialidadComponent implements OnInit {

  columnas: string[] = ['nombre','area_medica','acciones'];
  dataSource = [];
  totalFilas = 0;

  cargando: boolean = true;
  mensajeCarga: string = "Cargando datos...";
  query: string = "";

  @ViewChild(MatTable) matTableServicio: MatTable<ServicioModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private servicioService: ServicioService,
    private authService: LoginService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {}

  abrirForm( servicio:ServicioModel ){
    this.matDialog.open(CrearServiciosEspecialidadComponent,{
      data: servicio,
      width: '40%'
    }).afterClosed().subscribe( res => {
      if(res.guardo){
        this.cargarDatos();
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.paginator._intl.itemsPerPageLabel = "Cantidad de items por página";
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void>{

    this.cargando = true;
    const res = await this.servicioService.listar({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "query": ""
    });

    console.log("data servicio");
    console.log(res);   

    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }

  async eliminar( servicioId:number, nombres:string ): Promise<void>{

    Swal.fire({
      title: `¿Seguro desea eliminar la especialidad ${nombres}?`,
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
          const res = await this.servicioService.eliminar(servicioId);
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
    const res = await this.servicioService.listar({
      "numeroPagina": this.paginator.pageIndex = 0,
      "totalFilasPagina": this.paginator.pageSize,
      "query": this.query
    });

    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }

}
