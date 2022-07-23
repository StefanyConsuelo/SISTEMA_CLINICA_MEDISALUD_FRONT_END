import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotivoConsultaModel } from 'src/app/definiciones/motivo-consulta.model';
import { MotivoConsultaService } from 'src/app/servicios/motivo-consulta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hc-crear-motivo-consulta',
  templateUrl: './hc-crear-motivo-consulta.component.html',
  styleUrls: ['./hc-crear-motivo-consulta.component.css']
})
export class HcCrearMotivoConsultaComponent implements OnInit {

  form: FormGroup;
  cargando: boolean = false;
  mensajeCarga: string = "Guardando datos...";

  @Output() notificarRegistroNuevo: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private motivoConsultaService: MotivoConsultaService
  ) { }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm(){
    this.form = this.fb.group({
      tipoEnfermedad: ['', Validators.required],
      sintomasPrincipales: ['', Validators.required],
      relato: [''],
      apetito: [''],
      sedantes:[''],
      orina: ['']
    });
  }

  async registrar(): Promise<void>{

    let mc = new MotivoConsultaModel();
    let datasetHistoriaClinicaId = document.getElementById("historiaClinicaId").dataset.historiaclinicaid;
    mc.tipoEnfermedad = this.form.get("tipoEnfermedad").value.trim();
    mc.sintomasPrincipales = this.form.get("sintomasPrincipales").value.trim();
    mc.relato = this.form.get("relato").value.trim();
    mc.apetito = this.form.get("apetito").value.trim();
    mc.sedantes = this.form.get("sedantes").value.trim();
    mc.orina = this.form.get("orina").value.trim();
    mc.historiaClinicaId = Number.parseInt(datasetHistoriaClinicaId);

    if(!mc.tipoEnfermedad && !mc.sintomasPrincipales && !mc.relato && !mc.apetito
        && !mc.sedantes && !mc.orina ){

      Swal.fire("Aviso!", "Complete al menos un campo del formulario", "warning");

    } else {

      try {

        this.cargando = true;
        
        const res = await this.motivoConsultaService.registrar(mc);

        Swal.fire( 'Éxito', 'Se registró correctamente', 'success' );
        this.notificarRegistroNuevo.emit(mc);
        this.cargando = false;
        this.crearForm();
      } catch (error) {
        Swal.fire( 'Error', 'Error de sistema', 'error' );
      }

    }
  }

  limpiarCampos(): void{
    this.form.get("tipoEnfermedad").setValue("");
    this.form.get("sintomasPrincipales").setValue("");
    this.form.get("relato").setValue("");
    this.form.get("apetito").setValue("");
    this.form.get("sedantes").setValue("");
    this.form.get("orina").setValue("");
  }
}
