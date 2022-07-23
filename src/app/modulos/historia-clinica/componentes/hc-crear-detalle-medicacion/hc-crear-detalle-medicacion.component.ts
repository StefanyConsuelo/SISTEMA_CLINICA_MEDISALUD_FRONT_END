import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DetalleMedicacionModel } from 'src/app/definiciones/detalle-medicacion.model';
import { MedicacionModel } from 'src/app/definiciones/medicacion.model';
import { LoginService } from 'src/app/servicios/login.service';
import { MedicacionService } from 'src/app/servicios/medicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hc-crear-detalle-medicacion',
  templateUrl: './hc-crear-detalle-medicacion.component.html',
  styleUrls: ['./hc-crear-detalle-medicacion.component.css']
})
export class HcCrearDetalleMedicacionComponent implements OnInit {

  dataSource: DetalleMedicacionModel [] = [];
  columnas: string[] = ["medicamento","via","duracion","frecuencia","indicaciones","accion"];
  historiaClinicaId: number = null;
  cargando: boolean = false;
  mensajeCarga: string = "Cargando datos...";

  @Output() notificarNuevoRegistro: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private medicacionService: MedicacionService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  async agregarFila( eventData:DetalleMedicacionModel ): Promise<void>{
    eventData.medicamentoId = eventData.medicamento.medicamentoId;

    const rsp = this.dataSource.findIndex( dm => dm.medicamento.medicamentoId == eventData.medicamento.medicamentoId );

    if(rsp == -1 ){
      this.dataSource.unshift( eventData );
      this.dataSource = [...this.dataSource];  
    } else {
      Swal.fire("Aviso!", `El medicamento ${eventData.medicamento.nombre} ya se encuentra agregado en la lista`,"warning");
    }     
  }

  async registrar(): Promise<void>{
    try {
      this.cargando = true;
      this.mensajeCarga = "Guardando datos...";

      const datasetHistoriaClinicaId = document.getElementById("historiaClinicaId").dataset.historiaclinicaid;
      const medicacion = new MedicacionModel();
      const personaId = this.loginService.getDataDesdeToken().personaId;

      medicacion.detalleMedicacion = this.dataSource;
      medicacion.historiaClinicaId = parseInt(datasetHistoriaClinicaId);
      medicacion.personaId = personaId;
      
      const res = await this.medicacionService.registrar(medicacion);

      medicacion.fechaRegistro = res.fechaRegistro;
      
      this.notificarNuevoRegistro.emit(true);

      Swal.fire("Éxito", "Se registro la medicación correctamente", "success");

      this.dataSource.splice(0, this.dataSource.length);
      this.dataSource = [...this.dataSource];
      this.cargando = false;
    } catch (error) {
      Swal.fire("Error", "Error de sistema", "error");
      this.cargando = false;
    }
  }

  eliminar(eventData){
    const rsp = this.dataSource.findIndex( dm => dm.medicamento.medicamentoId == eventData.medicamento.medicamentoId );
    this.dataSource.splice(rsp,1);
    this.dataSource = [...this.dataSource]; 
  } 
}
