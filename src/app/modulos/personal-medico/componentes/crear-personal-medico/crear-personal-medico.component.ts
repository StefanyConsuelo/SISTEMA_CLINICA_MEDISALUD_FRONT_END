import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaMedicaModel } from 'src/app/definiciones/area-medica.model';
import { PersonalMedicoModel } from 'src/app/definiciones/personal-medico.model';
import { ServicioModel } from 'src/app/definiciones/servicio.model';
import { AreaMedicaService } from 'src/app/servicios/area-medica.service';
import { PersonalMedicoService } from 'src/app/servicios/personal-medico.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-crear-personal-medico',
  templateUrl: './crear-personal-medico.component.html',
  styleUrls: ['./crear-personal-medico.component.css'],
  providers: [DatePipe]
})
export class CrearPersonalMedicoComponent implements OnInit {

  cargando: boolean = false;

  form: FormGroup;
  personalMedico: PersonalMedicoModel;
  areasMedicas: AreaMedicaModel[] = [];
  servicios: ServicioModel[] = [];
  personalMedicoId: number;
  bloquear: boolean = false;
  mensajeCarga: string = "Cargando...";

  constructor( 
    private fb: FormBuilder,
    private areaMedicaService: AreaMedicaService,
    private servicioService: ServicioService,
    private personalMedicoService: PersonalMedicoService,
    private datePipe: DatePipe,
    private router: Router,
    private routerActivated: ActivatedRoute
  ) { 
    this.personalMedicoId = this.routerActivated.snapshot.params.id;
  }

  async ngOnInit(): Promise<void> {
    this.crearForm();
    this.cargando = true;
    this.areasMedicas = await this.areaMedicaService.listarTodos();
    if(this.personalMedicoId){
      this.bloquear = true;
      this.personalMedico = await this.personalMedicoService.buscarPorId(this.personalMedicoId);
      this.servicios = await this.servicioService.listarPor(this.personalMedico?.servicio?.areaMedica?.areaMedicaId);
      this.crearForm();
    } else {
      this.personalMedico = new PersonalMedicoModel();
    }
    this.cargando = false;
  }

  crearForm(){
    this.form = this.fb.group({
      nombres: [ this.personalMedico?.nombres, Validators.compose([Validators.required]) ],
      paterno: [ this.personalMedico?.apellidoPaterno, Validators.required ],
      materno: [ this.personalMedico?.apellidoMaterno, Validators.required ],
      tipoDocumento: [ this.personalMedico?.tipoDocumento, Validators.required ],
      numeroDocumento: [this.personalMedico?.numeroDocumento, Validators.required ],
      fechaNacimiento: [this.personalMedico?.fechaNacimiento, Validators.required ],
      telefonoFijo: [this.personalMedico?.telefonoFijo],
      celular: [this.personalMedico?.celular],
      correo: [this.personalMedico?.correo],      
      profesion: [this.personalMedico?.profesion],
      servicio: [this.personalMedico?.servicio.servicioId, Validators.required],
      documentoProfesional: [this.personalMedico?.documentoProfesional],
      numeroDocumentoProfesional: [this.personalMedico?.numeroDocumentoProfesional],
      estadoLaboral:[this.personalMedico?.estadoLaboral],
      areaMedica: [this.personalMedico?.servicio.areaMedica.areaMedicaId, Validators.required]
    });
  }

  async registrar(): Promise<void>{
    
    this.cargando = true;
    this.mensajeCarga = "Registrando...";
    let mensaje = "";
    let personalMedico = new PersonalMedicoModel();
    
    personalMedico.nombres = this.form.get("nombres").value;
    personalMedico.apellidoPaterno = this.form.get("paterno").value;
    personalMedico.apellidoMaterno = this.form.get("materno").value;
    personalMedico.tipoDocumento = this.form.get("tipoDocumento").value;
    personalMedico.numeroDocumento = this.form.get("numeroDocumento").value;
    personalMedico.fechaNacimiento = this.datePipe.transform(this.form.get("fechaNacimiento").value, 'yyyy-MM-dd', 'UTC+5'); 
    personalMedico.telefonoFijo = this.form.get("telefonoFijo").value;
    personalMedico.celular = this.form.get("celular").value;
    personalMedico.correo = this.form.get("correo").value;
    personalMedico.profesion = this.form.get("profesion").value;
    personalMedico.servicioId = this.form.get("servicio").value;
    personalMedico.documentoProfesional = this.form.get("documentoProfesional").value;
    personalMedico.numeroDocumentoProfesional = this.form.get("numeroDocumentoProfesional").value;
    personalMedico.estadoLaboral = this.form.get("estadoLaboral").value;
    personalMedico.personalMedicoId = this.personalMedico.personalMedicoId;

    try {

      if(this.personalMedico.personalMedicoId){
        await this.personalMedicoService.editar(personalMedico);
        mensaje = "Se guardó los cambios correctamente.";
      } else {
        await this.personalMedicoService.registrar(personalMedico);
        mensaje = "Se registro el personal médico correctamente.";
      }

      this.router.navigate(['/personal-medico/listar']);

      Swal.fire( 'Éxito', mensaje, 'success' );

    } catch (error) {
      if( error.status == 400 ){
        Swal.fire( 'Aviso', error.error, 'warning' );
      } else {
        Swal.fire( 'Error', error.error, 'error' );
      }
    }

    this.cargando = false;
  }

  async buscarServicios( areaMedicaId:number ): Promise<void> {
    if(areaMedicaId){
      this.cargando = true;
      this.servicios = await this.servicioService.listarPor(areaMedicaId);
      this.cargando = false;
    }
    
  }
}
