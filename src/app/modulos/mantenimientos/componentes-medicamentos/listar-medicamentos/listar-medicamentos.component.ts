import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MedicamentoModel } from 'src/app/definiciones/medicamento.model';
import { LoginService } from 'src/app/servicios/login.service';
import { MedicamentoService } from 'src/app/servicios/medicamento.service';
import Swal from 'sweetalert2';
import { CrearMedicamentosComponent } from '../crear-medicamentos/crear-medicamentos.component';

@Component({
  selector: 'app-listar-medicamentos',
  templateUrl: './listar-medicamentos.component.html',
  styleUrls: ['./listar-medicamentos.component.css']
})
export class ListarMedicamentosComponent implements OnInit {

  columnas: string[] = ['nombre','acciones'];
  dataSource = [];
  totalFilas = 0;

  cargando: boolean = true;
  mensajeCarga: string = "Cargando datos...";
  query: string = "";

  @ViewChild(MatTable) matTableMedicamento: MatTable<MedicamentoModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private medicamentoService: MedicamentoService,
    private authService: LoginService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {}

  abrirForm( medicamento:MedicamentoModel ){
    this.matDialog.open(CrearMedicamentosComponent,{
      data: medicamento,
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
    const res = await this.medicamentoService.listar({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "query": ""
    });

    console.log("data medicamento");
    console.log(res);   

    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }

  async eliminar( medicamentoId:number, nombres:string ): Promise<void>{

    Swal.fire({
      title: `¿Seguro desea eliminar el medicamento ${nombres}?`,
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
          const res = await this.medicamentoService.eliminar(medicamentoId);
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
    const res = await this.medicamentoService.listar({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "query": this.query
    });

    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }
}
