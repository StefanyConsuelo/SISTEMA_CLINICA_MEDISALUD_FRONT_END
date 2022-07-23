import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { ExamenModel } from 'src/app/definiciones/examen.model';
import { CrearCitaMedicaComponent } from 'src/app/modulos/cita-medica/componentes/crear-cita-medica/crear-cita-medica.component';
import { ExamenService } from 'src/app/servicios/examen.service';
import { LoginService } from 'src/app/servicios/login.service';
import Swal from 'sweetalert2';
import { HcEditarResultadoExamenComponent } from './hc-editar-resultado-examen/hc-editar-resultado-examen.component';

@Component({
  selector: 'app-hc-listar-examenes',
  templateUrl: './hc-listar-examenes.component.html',
  styleUrls: ['./hc-listar-examenes.component.css']
})
export class HcListarExamenesComponent implements OnInit {

  totalFilas: number = 0;
  cargando : boolean = false;
  mensajeCarga : string = "Cargando datos...";
  dataSource: ExamenModel [] = [];
  columnas: string[] = ["codigo", "servicio","personalMedico","estado","resultado","acciones"];

  @ViewChild(MatTable) matTableExamen: MatTable<ExamenModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  query: string = "";

  constructor(
    private examenService: ExamenService,
    private dialog: MatDialog,
    private authService: LoginService
  ) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    this.paginator._intl.itemsPerPageLabel = "Cantidad de items por página";
    this.cargarDatos();
  }

  async filtrar(): Promise<void>{
    this.cargando = true;
    let datasetHistoriaClinicaId = document.getElementById("historiaClinicaId").dataset.historiaclinicaid;
    const res = await this.examenService.listar({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize,
      "objeto": {
        "historiaClinicaId": datasetHistoriaClinicaId
      },
      "query": this.query
    });

    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;      
  }

  tienePermisoRol( codigoRol:string, codigoModulo: string ): boolean{
    const tienePermiso = this.authService.validarPermisoRol(codigoRol, codigoModulo);
    return tienePermiso;
  }

  generarCita(element:ExamenModel){
    console.log("element cita");
    console.log(element);    
    
    this.dialog.open(CrearCitaMedicaComponent, {
      width:'90%',
      data: element
    }).afterClosed().subscribe( async (res) => {
      if(res.guardo){
        this.cargando = true;
        this.mensajeCarga = "Actualizando estado de examen...";
        const res = await this.examenService.actualizarEstadoCitaGenerada(element.examenId);
        this.cargando = false;
        this.cargarDatos();
      }
    });
  }

  finalizarExamen(element:ExamenModel){
    Swal.fire({
      title: `¿Seguro desea finalizar el examen con código ${element.codigo}?`,
      text: 'Al presionar si, se procede a eliminar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, finalizar.',
      cancelButtonText: 'No, cancelar'
    }).then( async (result) => {
      if (result.value) {
        try {
          this.cargando = true;
          this.mensajeCarga = "Finalizando...";
          const res = await this.examenService.finalizarExamen(element.examenId);
          this.paginator.pageIndex = 0;
          this.cargarDatos();          
          Swal.fire('Finalizado!','Se finalizó correctamente.','success');
        } catch (error) {
          Swal.fire('Error!','hubo un problema al finalizar.','error');
        }
      }
    });
  }

  editarResultado(element:ExamenModel){
    this.dialog.open(HcEditarResultadoExamenComponent,{
      width: '40%',
      data: element
    }).afterClosed().subscribe( res => {
      console.log(res);      
      if(res.guardo){
        this.cargarDatos();
      }
    })
  }

  async cargarDatos(): Promise<void>{
    this.cargando = true;
    let datasetHistoriaClinicaId = document.getElementById("historiaClinicaId").dataset.historiaclinicaid;
    const res = await this.examenService.listar({
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

}
