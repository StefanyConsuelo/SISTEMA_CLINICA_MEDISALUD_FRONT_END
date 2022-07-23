import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleMedicacionModel } from 'src/app/definiciones/detalle-medicacion.model';
import { DosisMedicacionModel } from 'src/app/definiciones/dosis-medicacion.model';
import { DosisMedicacionService } from 'src/app/servicios/dosis-medicacion.service';
import { HospitalizacionService } from 'src/app/servicios/hospitalizacion.service';
import { LoginService } from 'src/app/servicios/login.service';
import { MedicacionService } from 'src/app/servicios/medicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-hospitalizacion',
  templateUrl: './edit-hospitalizacion.component.html',
  styleUrls: ['./edit-hospitalizacion.component.css']
})
export class EditHospitalizacionComponent implements OnInit {

  cargando = true;
  mensajeCarga = "Cargando datos...";
  columnasDetalleMedicacion: string [] = ["medicamento", "indicaciones", "dosis", "frecuencia", "via"];
  columnasDosis: string [] = ["numeroDosis", "fechaDosis", "horaDosis", "medicamento"];
  dataSourceMedicamentos: DetalleMedicacionModel[] = [];
  dataSourceDosis: DosisMedicacionModel[] = [];
  historiaClinicaId: number = null;
  hospitalizacionId: number = null;
  alta: string = "NO";
  camaId: number = null;
  nombrePaciente: string = null;
  numeroHistoriaClinica: string;

  @ViewChild(MatTable) matTableDetalleMedicacion: MatTable<DetalleMedicacionModel>;

  /*
    detalleMedicacionId: number = null;
    frecuencia: string = null;
    dosis: string = null;
    via: string = null;
    siguienteDosis: string = null;
    indicaciones: string = null;
    medicacion: MedicacionModel = null;
    medicamento: MedicamentoModel = null;
  
  */
  constructor(
    private medicacionService: MedicacionService,
    private dosisMedicacionService: DosisMedicacionService,
    private routerActived: ActivatedRoute,
    private authService: LoginService,
    private hospiService: HospitalizacionService,
    private router: Router
  ) { 

    this.routerActived.queryParams.subscribe( res => {
      console.log("routerActived res edit");
      console.log(res);
      
      this.historiaClinicaId = res.historiaClinicaId;
      this.hospitalizacionId =  res.hospitalizacionId;
      this.alta = res.alta;
      this.camaId = res.camaId;
      this.nombrePaciente = res.nombrePaciente;
      this.numeroHistoriaClinica = res.numeroHistoriaClinica;
    });

    if(this.tienePermisoRol("ROLE_MARCAR_DOSIS_HOSPITALIZACION","HOSPITALIZACION"))
      this.columnasDosis.push("acciones");
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  async ngAfterViewInit(): Promise<void> {}
  
  async cargarDatos(): Promise<void> {
    this.cargando = true;
    this.dataSourceMedicamentos = await this.medicacionService.listarUltimaMedicacion(this.historiaClinicaId);
    this.dataSourceDosis = await this.dosisMedicacionService.listarSiguienteMedicacion(this.historiaClinicaId);
    this.cargando = false;
  }

  dosisRealizada( dosis: DosisMedicacionModel ){
    Swal.fire({
      title: `¿Se realizó la medicación de ${dosis.detalleMedicacion.medicamento.nombre} al paciente?`,
      text: 'Al presionar si, se procede a actualizar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar.',
      cancelButtonText: 'No, cancelar'
    }).then( async (result) => {
      if (result.value) {
        try {
          this.cargando = true;
          this.mensajeCarga = "Actualizando dosis...";
          await this.dosisMedicacionService.actualizar(dosis.dosisMedicacionId);
          this.cargarDatos();          
          Swal.fire('Éxito!','Se guardó la dosis realizada correctamente.','success');
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

  darDeAlta(){
    Swal.fire({
      title: `¿Seguro desea dar de alta al paciente ${this.nombrePaciente}?`,
      text: 'Al presionar si, se dará de alta.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, dar de alta.',
      cancelButtonText: 'No, cancelar'
    }).then( async (result) => {
      if (result.value) {
        try {
          this.cargando = true;
          this.mensajeCarga = "Actualizando datos...";
          const res = await this.hospiService.darAlta(this.hospitalizacionId);
          this.router.navigate(['/hospitalizacion/listar']);
          Swal.fire("Éxito", `Se dió de alta al paciente ${this.nombrePaciente}`, "success");
        } catch (error) {
          Swal.fire('Error!','Error de sistema.','error');
        }
      }
    });
  }

  darDisponibilidadCama() {
    Swal.fire({
      title: `¿Seguro desea dar disponibilidad la cama H0${this.camaId}?`,
      text: 'Al presionar si, se pondrá disponible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, dar disponibilidad.',
      cancelButtonText: 'No, cancelar'
    }).then( async (result) => {
      if (result.value) {
        try {
          this.cargando = true;
          this.mensajeCarga = "Actualizando datos...";
          const res = await this.hospiService.darDisponibilidadCama(this.hospitalizacionId, this.camaId);
          this.router.navigate(['/hospitalizacion/listar']);
          Swal.fire("Éxito", "Se actualizaron los datos", "success");
        } catch (error) {
          Swal.fire('Error!','Error de sistema.','error');
        }
      }
    });
  }

  darAltaYDisponibilidadCama(){
    Swal.fire({
      title: `¿Seguro desea dar de alta al paciente ${this.nombrePaciente} y disponer la cama H0${this.camaId}?`,
      text: 'Al presionar si, se procede a dar de alta al paciente y disponer de la cama.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar.',
      cancelButtonText: 'No, cancelar'
    }).then( async (result) => {
      if (result.value) {
        try {
          this.cargando = true;
          this.mensajeCarga = "Actualizando datos...";
          const res1 = await this.hospiService.darAlta(this.hospitalizacionId);
          const res2 = await this.hospiService.darDisponibilidadCama(this.hospitalizacionId, this.camaId);
          this.router.navigate(['/hospitalizacion/listar']);
          Swal.fire("Éxito", "Se actualizaron los datos", "success");
        } catch (error) {
          Swal.fire('Error!','Error de sistema.','error');
        }
      }
    });
  }
}
