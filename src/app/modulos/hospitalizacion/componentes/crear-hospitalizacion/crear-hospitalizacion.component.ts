import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalMedicoModel } from 'src/app/definiciones/personal-medico.model';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { PersonalMedicoService } from 'src/app/servicios/personal-medico.service';
import Swal from 'sweetalert2';
import { HospitalizacionModel } from 'src/app/definiciones/hospitalizacion.model';
import { HospitalizacionService } from 'src/app/servicios/hospitalizacion.service';

@Component({
  selector: 'app-crear-hospitalizacion',
  templateUrl: './crear-hospitalizacion.component.html',
  styleUrls: ['./crear-hospitalizacion.component.css']
})
export class CrearHospitalizacionComponent implements OnInit {

  cargando:boolean = false;
  mensajeCarga:string = "Cargando datos...";
  form:FormGroup;
  alta: string = "NO";
  pacienteIdEncontrado:number = 0;
  camaIdSeleccionado: number = 0;
  personalMedicos:PersonalMedicoModel[] = [];

  @ViewChild("nombrePacienteLabel") nombrePacienteLabel: ElementRef;

  constructor( 
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private routerActived: ActivatedRoute,
    private personalMedicoService: PersonalMedicoService,
    private hospitalizacionService: HospitalizacionService,
    private router: Router ) { 

    this.routerActived.queryParams.subscribe( res => {
      this.camaIdSeleccionado = res.camaId;
    });
  }

  crearForm(){
    this.form = this.fb.group({
      preDiagnostico: ['', Validators.required],
      procedencia: ['', Validators.required],
      observacion: [''],
      estado: ['Activo', Validators.required],
      tipoDocumento: [''],
      numeroDocumento: [''],
      paciente:['',Validators.required],
      personalMedico:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.crearForm();
    this.cargarPersonalMedico();
  }

  async registrar(): Promise<void> {

    let hosptalizacion = new HospitalizacionModel();

    hosptalizacion.pacienteId = this.pacienteIdEncontrado;
    hosptalizacion.preDiagnostico = this.form.get("preDiagnostico").value;
    hosptalizacion.observacion = this.form.get("observacion").value;
    hosptalizacion.personalMedicoId = this.form.get("personalMedico").value;
    hosptalizacion.estado = this.form.get("estado").value;
    hosptalizacion.procedencia = this.form.get("procedencia").value;
    hosptalizacion.alta = this.alta;
    hosptalizacion.camaId = this.camaIdSeleccionado;
    
    try {
      this.cargando = true;
      this.mensajeCarga = "Guardando datos...";

      const res = await this.hospitalizacionService.registrar(hosptalizacion);

      Swal.fire("Éxito", "Se registro la hospitalización correctamente","success");

      this.cargando = false;

      this.router.navigate(['/hospitalizacion/listar'])
      
    } catch (error) {

      Swal.fire("Error", "Error de sistema","error");
      
    }
    

  }

  async buscarPaciente(): Promise<void>{
    let numeroDocumento = this.form.get("numeroDocumento").value;

    try {

      this.cargando = true;
      this.mensajeCarga = "Buscando paciente...";

      const res = await this.pacienteService.buscarPor(numeroDocumento, this.form.get('tipoDocumento').value);

      this.pacienteIdEncontrado = res.pacienteId;
      this.form.get("paciente").setValue(res.nombres + ", " + res.apellidoPaterno + " " + res.apellidoMaterno);

    } catch (error) {
      if( error.status == 404 ){
        this.form.get("paciente").setValue("");
        this.pacienteIdEncontrado = 0;
        this.nombrePacienteLabel.nativeElement.value = "";
        Swal.fire("Aviso", `No se encontró al paciente con número de documento ${numeroDocumento}`,"warning" );
      } else {
        this.form.get("paciente").setValue("");
        this.pacienteIdEncontrado = 0;
        this.nombrePacienteLabel.nativeElement.value = "";
        Swal.fire("Error","Error de sistema","error");
      }
    }
    this.cargando = false;
  }

  async cargarPersonalMedico(): Promise<void>{
    this.cargando = true;
    const res = await this.personalMedicoService.listarTodos();
    this.personalMedicos = res;
    this.cargando = false;
  }

  getNombrePersonalMedico( pm:PersonalMedicoModel ): string{
    return pm.nombres + ", " + pm.apellidoPaterno + " " + pm.apellidoMaterno;
  }

}

