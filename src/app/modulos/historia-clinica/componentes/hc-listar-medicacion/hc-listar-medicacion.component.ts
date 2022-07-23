import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { DetalleMedicacionModel } from 'src/app/definiciones/detalle-medicacion.model';
import { MedicacionModel } from 'src/app/definiciones/medicacion.model';
import { MedicamentoModel } from 'src/app/definiciones/medicamento.model';
import { MedicacionService } from 'src/app/servicios/medicacion.service';
import { HcCrearDetalleMedicacionComponent } from '../hc-crear-detalle-medicacion/hc-crear-detalle-medicacion.component';

@Component({
  selector: 'app-hc-listar-medicacion',
  templateUrl: './hc-listar-medicacion.component.html',
  styleUrls: ['./hc-listar-medicacion.component.css']
})
export class HcListarMedicacionComponent implements OnInit {

  totalFilas: number = 0;
  cargando : boolean = false;
  mensajeCarga : string = "Cargando datos...";
  dataSource: MedicacionModel [] = [];
  columnas: string[] = ["fecha_registro","personal_medico"];

  dataSourceDetalle: DetalleMedicacionModel[] = [];
  columnasDetalle: string[] = ["medicamento","indicaciones","dosis","duracion","frecuencia","via"];

  @ViewChild(MatTable) matTableMotivoConsulta: MatTable<MedicacionModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(HcCrearDetalleMedicacionComponent) HCDM: HcCrearDetalleMedicacionComponent;

  constructor(
    private medicacionService: MedicacionService
  ) { }

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    this.paginator._intl.itemsPerPageLabel = "Cantidad de items por página";
    this.cargarDatos(null);
  }

  async cargarDatos( eventData ): Promise<void>{
    this.cargando = true;
    const datasetHistoriaClinicaId = document.getElementById("historiaClinicaId").dataset.historiaclinicaid;
    const res = await this.medicacionService.listarPaginado({
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

  mostrarDatos( fila: MedicacionModel ){
    this.dataSourceDetalle = [...fila.detalleMedicacion];
  }

  getNombrePersonalMedico( medi: MedicacionModel ): string {
    if(medi.personalMedico){
      return medi.personalMedico.nombres + ", " + medi.personalMedico.apellidoPaterno + " " + medi.personalMedico.apellidoMaterno;
    } else {
      return "";
    }
  }

  getInstanciaMedicacion1(){
    let m = new MedicacionModel();

    m.estado = "Activo";
    m.fechaRegistro = "2021-12-22";
    m.detalleMedicacion = [];

    let dm1 = new DetalleMedicacionModel();

    dm1.dosis = "1 unidad";
    dm1.frecuencia = 8;
    dm1.indicaciones = "comer antes";
    dm1.siguienteDosis = 1;
    dm1.via = "oral";
    dm1.medicamento = new MedicamentoModel();
    dm1.medicamento.nombre = "paracetamol";
    dm1.medicamento.medicamentoId = 99;

    let dm2 = new DetalleMedicacionModel();

    dm2.dosis = "1 unidad";
    dm2.frecuencia = 12;
    dm2.indicaciones = "comer antes";
    dm2.siguienteDosis = 1;
    dm2.via = "oral";
    dm2.medicamento = new MedicamentoModel();
    dm2.medicamento.nombre = "amoxicilina";
    dm2.medicamento.medicamentoId = 100;

    m.detalleMedicacion.push(dm1);
    m.detalleMedicacion.push(dm2);

    return m;
  }

  getInstanciaMedicacion2(){
    let m = new MedicacionModel();

    m.estado = "Eliminado";
    m.fechaRegistro = "2021-12-21";
    m.detalleMedicacion = [];

    let dm1 = new DetalleMedicacionModel();

    dm1.dosis = "1 unidad";
    dm1.frecuencia = 8;
    dm1.indicaciones = "comer antes";
    dm1.siguienteDosis = 1;
    dm1.via = "oral";
    dm1.medicamento = new MedicamentoModel();
    dm1.medicamento.nombre = "bronco magnimox";
    dm1.medicamento.medicamentoId = 102;

    let dm2 = new DetalleMedicacionModel();

    dm2.dosis = "1 unidad";
    dm2.frecuencia = 8;
    dm2.indicaciones = "comer antes";
    dm2.siguienteDosis = 5;
    dm2.via = "oral";
    dm2.medicamento = new MedicamentoModel();
    dm2.medicamento.nombre = "naproxeno";
    dm2.medicamento.medicamentoId = 101;

    m.detalleMedicacion.push(dm1);
    m.detalleMedicacion.push(dm2);

    return m;
  }
}
