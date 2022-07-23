import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AreaMedicaModel } from 'src/app/definiciones/area-medica.model';
import { AreaMedicaService } from 'src/app/servicios/area-medica.service';
import { LoginService } from 'src/app/servicios/login.service';
import Swal from 'sweetalert2';
import { CrearAreaMedicaComponent } from '../crear-area-medica/crear-area-medica.component';

@Component({
  selector: 'app-listar-area-medicas',
  templateUrl: './listar-area-medicas.component.html',
  styleUrls: ['./listar-area-medicas.component.css']
})
export class ListarAreaMedicasComponent implements OnInit {

  columnas: string[] = ['nombre','acciones'];
  dataSource = [];
  totalFilas = 0;

  cargando: boolean = true;
  mensajeCarga: string = "Cargando datos...";
  query: string = "";

  @ViewChild(MatTable) matTableArea: MatTable<AreaMedicaModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private areaMedicaService: AreaMedicaService,
    private authService: LoginService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {}

  abrirForm( area:AreaMedicaModel ){
    this.matDialog.open(CrearAreaMedicaComponent,{
      data: area,
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
    const res = await this.areaMedicaService.listar({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "query": ""
    });

    console.log("data area");
    console.log(res);   

    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }

  async eliminar( areaId:number, nombres:string ): Promise<void>{

    Swal.fire({
      title: `¿Seguro desea eliminar el area médica ${nombres}?`,
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
          const res = await this.areaMedicaService.eliminar(areaId);
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
    const res = await this.areaMedicaService.listar({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "query": this.query
    });

    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }
}
