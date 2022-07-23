import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AreaMedicaModel } from 'src/app/definiciones/area-medica.model';
import { CitaMedicaModel } from 'src/app/definiciones/cita-medica.model';
import { ExamenModel } from 'src/app/definiciones/examen.model';
import { HorarioMedicoModel } from 'src/app/definiciones/horario-medico.model';
import { ItemHoraModel } from 'src/app/definiciones/item-hora.model';
import { PacienteModel } from 'src/app/definiciones/paciente.model';
import { PersonalMedicoModel } from 'src/app/definiciones/personal-medico.model';
import { ServicioModel } from 'src/app/definiciones/servicio.model';
import { HcCrearExamenesComponent } from 'src/app/modulos/historia-clinica/componentes/hc-crear-examenes/hc-crear-examenes.component';
import { CrearPacienteComponent } from 'src/app/modulos/paciente/componentes/crear-paciente/crear-paciente.component';
import { AreaMedicaService } from 'src/app/servicios/area-medica.service';
import { CitaMedicaService } from 'src/app/servicios/cita-medica.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { PersonalMedicoService } from 'src/app/servicios/personal-medico.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2';
import { getNuevosItemsTurnoManana, 
  getNuevosItemsTurnoNoche, 
  getNuevosItemsTurnoTarde, 
  TITULOS_HORARIO_TARDE,
  TITULOS_HORARIO_MANANA, 
  TITULOS_HORARIO_NOCHE,
  BACKGROUND_COLOR_DISPONIBLE,
  BACKGROUND_COLOR_OCUPADO,
  TURNO_MANANA,
  TURNO_TARDE,
  TURNO_NOCHE,
  BACKGROUND_COLOR_RESERVAR
  } from '../../util/data';

@Component({
  selector: 'app-crear-cita-medica',
  templateUrl: './crear-cita-medica.component.html',
  styleUrls: ['./crear-cita-medica.component.css'],
  providers: [DatePipe]
})
export class CrearCitaMedicaComponent implements OnInit {

  form: FormGroup;

  servicios   : ServicioModel[] = [];
  areasMedicas: AreaMedicaModel[] = [];
  medicos     : HorarioMedicoModel[] = [];
  citas       : CitaMedicaModel[] = [];
  titulos     : any[] = [];

  pacienteIdEncontrado:number = 0;

  cargando: boolean = false;
  mensajeCarga: string = "Cargando datos...";
  ocultarApoyo:boolean = false;
  heigth: string = "39px";
  itemSeleccionado:ItemHoraModel = null;
  
  citaMedica:CitaMedicaModel = new CitaMedicaModel();

  @ViewChild("nombrePacienteLabel") nombrePacienteLabel: ElementRef;

  constructor(
    private servicioService: ServicioService,
    private areaMedicaService: AreaMedicaService,
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private personalMedicoService: PersonalMedicoService,
    private datePipe: DatePipe,
    private citaMedicaService: CitaMedicaService,
    private router:Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) dialogData: ExamenModel,
    private dialogRef: MatDialogRef<HcCrearExamenesComponent>

  ) { 
    if(dialogData && dialogData.codigo){
      this.citaMedica 
      this.citaMedica.areaMedicaId = dialogData.servicio.areaMedica.areaMedicaId;
      this.citaMedica.servicioId = dialogData.servicio.servicioId;
      this.citaMedica.solicitudExamen = true;
      this.citaMedica.paciente = new PacienteModel();
      this.citaMedica.paciente.nombres = dialogData.historiaClinica.paciente.nombres;
      this.citaMedica.paciente.apellidoPaterno = dialogData.historiaClinica.paciente.apellidoPaterno;
      this.citaMedica.paciente.apellidoMaterno = dialogData.historiaClinica.paciente.apellidoMaterno;
      this.pacienteIdEncontrado = dialogData.historiaClinica.paciente.pacienteId;
    } 
  }

  async ngOnInit(): Promise<void> {
    this.cargando = true;
    this.crearForm();
    this.cargando = true;
    this.areasMedicas = await this.areaMedicaService.listarTodos();
    if(this.citaMedica.solicitudExamen){
      this.buscarServicios(this.citaMedica.areaMedicaId);
      this.buscarHorarioMedicos(this.citaMedica.servicioId);
    }
    this.cargando = false;
    this.crearForm();
    this.cargando = false;

    this.nombrePacienteLabel.nativeElement.value = this.citaMedica.paciente.nombres + ' ' + 
      this.citaMedica.paciente.apellidoPaterno + ' ' + this.citaMedica.paciente.apellidoMaterno;
  }

  abrirFormPaciente(): void {
    this.dialog.open(CrearPacienteComponent,{
      data:{
        quitarBotonCancel: true
      },
      width: '80%'
    }).afterClosed().subscribe( resp => {
      console.log("datos devueltos al cerrar el dialog");
      console.log(resp); 
      if(resp.guardo){
        // ejecutar el buscar por dni y num.
        this.pacienteIdEncontrado = resp.paciente.pacienteId;
        this.nombrePacienteLabel.nativeElement.value = resp.paciente.nombres + ", " + resp.paciente.apellidoPaterno + " " + resp.paciente.apellidoMaterno;
      }
    });
  }

  crearForm(){
    this.form = this.fb.group({
      areaMedica: [ this.citaMedica?.areaMedicaId ],
      servicio:   [ this.citaMedica?.servicioId ],
      fechaCita: [''],
      turno: [''],
      numeroDocumento: [''],
      tipoDocumento: ['']
    });
  }

  async registrar(): Promise<void> {

    let citaMedica = new CitaMedicaModel();

    let enviar = this.validarFormulario();

    if( enviar ){
      this.mensajeCarga = "Guardando cita...";
      this.cargando = true;
      citaMedica.servicioId = this.form.get("servicio").value == 0 ? enviar = false : this.form.get("servicio").value;
      citaMedica.fechaCita = this.datePipe.transform(this.form.get("fechaCita").value, "yyyy-MM-dd");
      citaMedica.pacienteId = this.pacienteIdEncontrado;
      citaMedica.horaCita = this.itemSeleccionado.he+"-"+this.itemSeleccionado.hs;        
      citaMedica.personalMedicoId = this.itemSeleccionado.personalMedicoId;
  
      try {
        const res = await this.citaMedicaService.registrar(citaMedica);
        
        Swal.fire("Éxito", "Se registro la cita correctamente", "success");

        if(this.citaMedica.solicitudExamen){
          this.dialogRef.close({
            guardo: true
          });
        } else {
          this.router.navigate(["/cita-medica/listar"]);
        }
      } catch (error) {
        Swal.fire("Error", "Error en el sistema", "error");
      }
      this.cargando = false;
    } else {}
  }

  validarFormulario(): boolean {
    let campoObligatorios = new Array();
    if(this.form.get("servicio").value == 0){
      campoObligatorios.push("Seleccione un servicio");
    }
    if(this.form.get("fechaCita").value == ""){
      campoObligatorios.push("Seleccione una fecha de cita");
    }
    if(this.pacienteIdEncontrado == 0 ){
      campoObligatorios.push("Consultar un paciente");
    }
    if(!this.itemSeleccionado){
      campoObligatorios.push("Elija un horario de algún médico.");
    }
    
    let anadirMensaje = "";

    campoObligatorios.forEach( (element, index) => {
      anadirMensaje += "<p style='text-align: left; padding-left: 10px;'>"+(index+1)+". " + element + "</p>";
    });

    if( campoObligatorios.length > 0 ) {
      Swal.fire("Complete campos", "Para registra una cita considere los siguientes campos obligatorios" + anadirMensaje, "warning");
      return false;
    } else {
      return true;
    }
  }

  async buscarCitas( fechaCita:any ): Promise<void>{
    let miDate = fechaCita;
    console.log(miDate);    
    let fechaCitaRq = this.datePipe.transform(miDate, "yyyy-MM-dd");
    let servicioIdRq = this.form.get("servicio").value;

    if( servicioIdRq === "" ){
      this.form.get("fechaCita").setValue("");
      Swal.fire("Aviso","Seleccione el servicio","warning");
    } else {
      this.mensajeCarga = "Cargando citas...";
      this.cargando = true;
      const res = await this.citaMedicaService.listarPor( servicioIdRq, fechaCitaRq );
      this.citas = res;
      this.form.get("turno").setValue("");
      this.ocultarApoyo = false;
      this.establecerHeigthContainerCita(0);
      this.cargando = false;
    }
  }

  async buscarHorarioMedicos( servicioId:number): Promise<void> {
      if(servicioId != 0){
        this.mensajeCarga = "Cargando horarios medicos...";
        this.cargando = true;
        const res =  await this.personalMedicoService.listarHorarioMedicoPor(servicioId);
        this.medicos = res;
        this.cargando = false;
      }
      this.form.controls.turno.setValue("");
  }

  async buscarPaciente(): Promise<void>{
    let numeroDocumento = this.form.get("numeroDocumento").value;

    try {

      this.cargando = true;
      this.mensajeCarga = "Buscando paciente...";
      const res = await this.pacienteService.buscarPor(numeroDocumento, this.form.get("tipoDocumento").value);

      this.pacienteIdEncontrado = res.pacienteId;
      this.nombrePacienteLabel.nativeElement.value = res.nombres + ", " + res.apellidoPaterno + " " + res.apellidoMaterno;

    } catch (error) {
      if( error.status == 404 ){
        this.pacienteIdEncontrado = 0;
        this.nombrePacienteLabel.nativeElement.value = "";
        Swal.fire("Aviso", `No se encontró al paciente con número de documento ${numeroDocumento}`,"warning" );
      } else {
        this.pacienteIdEncontrado = 0;
        this.nombrePacienteLabel.nativeElement.value = "";
        Swal.fire("Error","Error de sistema","error");
      }
    }
    this.cargando = false;
  }

  reservarCita(item:any): void {
    if(this.itemSeleccionado)
      this.itemSeleccionado.color = BACKGROUND_COLOR_DISPONIBLE;

    item.color = BACKGROUND_COLOR_RESERVAR;
    this.itemSeleccionado = item;
  }

  pintarHorarioMedicoManana( horarioMedico: HorarioMedicoModel, dia: number ){

    let tm_dia_he = null;
    let tm_dia_hs = null;

    switch(dia) {
      case 1 : 
        tm_dia_he = horarioMedico.tmLunes.split("-")[0];
        tm_dia_hs = horarioMedico.tmLunes.split("-")[1];
      break;
      case 2 : 
        tm_dia_he = horarioMedico.tmMartes.split("-")[0];
        tm_dia_hs = horarioMedico.tmMartes.split("-")[1];
      break;
      case 3 : 
        tm_dia_he = horarioMedico.tmMiercoles.split("-")[0];
        tm_dia_hs = horarioMedico.tmMiercoles.split("-")[1];
      break;
      case 4 : 
        tm_dia_he = horarioMedico.tmJueves.split("-")[0];
        tm_dia_hs = horarioMedico.tmJueves.split("-")[1];
      break;
      case 5 : 
        tm_dia_he = horarioMedico.tmViernes.split("-")[0];
        tm_dia_hs = horarioMedico.tmViernes.split("-")[1];
      break;
      case 6 : 
        tm_dia_he = horarioMedico.tmSabado.split("-")[0];
        tm_dia_hs = horarioMedico.tmSabado.split("-")[1];
      break;
      case 0 : 
        tm_dia_he = horarioMedico.tmDomingo.split("-")[0];
        tm_dia_hs = horarioMedico.tmDomingo.split("-")[1];
      break;
    }

    this.pintarDisponibilidad(horarioMedico, tm_dia_he, tm_dia_hs);
  }

  pintarHorarioMedicoTarde( horarioMedico: HorarioMedicoModel, dia: number ){

    let tt_dia_he = null;
    let tt_dia_hs = null;

    switch(dia) {
      case 1 : 
        tt_dia_he = horarioMedico.ttLunes.split("-")[0];
        tt_dia_hs = horarioMedico.ttLunes.split("-")[1];
      break;
      case 2 : 
        tt_dia_he = horarioMedico.ttMartes.split("-")[0];
        tt_dia_hs = horarioMedico.ttMartes.split("-")[1];
      break;
      case 3 : 
        tt_dia_he = horarioMedico.ttMiercoles.split("-")[0];
        tt_dia_hs = horarioMedico.ttMiercoles.split("-")[1];
      break;
      case 4 : 
        tt_dia_he = horarioMedico.ttJueves.split("-")[0];
        tt_dia_hs = horarioMedico.ttJueves.split("-")[1];
      break;
      case 5 : 
        tt_dia_he = horarioMedico.ttViernes.split("-")[0];
        tt_dia_hs = horarioMedico.ttViernes.split("-")[1];
      break;
      case 6 : 
        tt_dia_he = horarioMedico.ttSabado.split("-")[0];
        tt_dia_hs = horarioMedico.ttSabado.split("-")[1];
      break;
      case 0 : 
        tt_dia_he = horarioMedico.ttDomingo.split("-")[0];
        tt_dia_hs = horarioMedico.ttDomingo.split("-")[1];
      break;
    }

    if(tt_dia_he == "" && tt_dia_hs == "" ){} 
    else {
      this.pintarDisponibilidad(horarioMedico, tt_dia_he, tt_dia_hs);
    }
  }

  pintarHorarioMedicoNoche( horarioMedico: HorarioMedicoModel, dia: number ){

    let tt_dia_he = null;
    let tt_dia_hs = null;

    switch(dia) {
      case 1 : 
        tt_dia_he = horarioMedico.tnLunes.split("-")[0];
        tt_dia_hs = horarioMedico.tnLunes.split("-")[1];
      break;
      case 2 : 
        tt_dia_he = horarioMedico.tnMartes.split("-")[0];
        tt_dia_hs = horarioMedico.tnMartes.split("-")[1];
      break;
      case 3 : 
        tt_dia_he = horarioMedico.tnMiercoles.split("-")[0];
        tt_dia_hs = horarioMedico.tnMiercoles.split("-")[1];
      break;
      case 4 : 
        tt_dia_he = horarioMedico.tnJueves.split("-")[0];
        tt_dia_hs = horarioMedico.tnJueves.split("-")[1];
      break;
      case 5 : 
        tt_dia_he = horarioMedico.tnViernes.split("-")[0];
        tt_dia_hs = horarioMedico.tnViernes.split("-")[1];
      break;
      case 6 : 
        tt_dia_he = horarioMedico.tnSabado.split("-")[0];
        tt_dia_hs = horarioMedico.tnSabado.split("-")[1];
      break;
      case 0 : 
        tt_dia_he = horarioMedico.tnDomingo.split("-")[0];
        tt_dia_hs = horarioMedico.tnDomingo.split("-")[1];
      break;
    }
    this.pintarDisponibilidad(horarioMedico, tt_dia_he, tt_dia_hs);
  }

  pintarDisponibilidad( horarioMedico:HorarioMedicoModel, t_dia_he: string, t_dia_hs:string ){
    let salir = false;
    let leer_salida = false;
    let leer_entrada = false;

    for (let index = 1; index < horarioMedico.items.length; index++) {

      if(horarioMedico.items[index].he == t_dia_he ){
        leer_entrada = true;
        horarioMedico.items[index].color = BACKGROUND_COLOR_DISPONIBLE;
        horarioMedico.items[index].esLaborable = true;
        horarioMedico.items[index].personalMedicoId = horarioMedico.personalMedico.personalMedicoId;
        leer_salida = true;
      }

      if(leer_salida){
        if(horarioMedico.items[index].hs == t_dia_hs ){
          horarioMedico.items[index].color = BACKGROUND_COLOR_DISPONIBLE;
          horarioMedico.items[index].esLaborable = true;
          horarioMedico.items[index].personalMedicoId = horarioMedico.personalMedico.personalMedicoId;
          salir = true;
        }
      }

      if(salir){
        break;
      }

      if(leer_entrada){
        horarioMedico.items[index].color = BACKGROUND_COLOR_DISPONIBLE;
        horarioMedico.items[index].esLaborable = true;
        horarioMedico.items[index].personalMedicoId = horarioMedico.personalMedico.personalMedicoId;
      }
    }
  }
  
  actualizarTurnos( turno:number ){
    var fechaCita = this.form.get("fechaCita").value;

    if( fechaCita ){
      var dia = this.form.get("fechaCita").value.getDay();

      if( turno != 0 ){

        this.ocultarApoyo = true;

        // consultar horarios medicos y citas

        if(turno == TURNO_MANANA){
          this.titulos = TITULOS_HORARIO_MANANA;
          this.medicos.forEach( hm => {
            hm.items = getNuevosItemsTurnoManana(this.getNombreMedicoCompleto(hm.personalMedico));
            this.pintarHorarioMedicoManana(hm, dia);
          });
        } else if( turno == TURNO_TARDE ){
          this.titulos = TITULOS_HORARIO_TARDE;
          this.medicos.forEach(hm => {
            hm.items = getNuevosItemsTurnoTarde(this.getNombreMedicoCompleto(hm.personalMedico));
            this.pintarHorarioMedicoTarde(hm, dia);
          });
        } else if( turno == TURNO_NOCHE ){
          this.titulos = TITULOS_HORARIO_NOCHE;
          this.medicos.forEach(hm => {
            hm.items = getNuevosItemsTurnoNoche(this.getNombreMedicoCompleto(hm.personalMedico));
            this.pintarHorarioMedicoNoche(hm, dia);
          });
  
        }

        this.establecerHeigthContainerCita(this.medicos.length);
        this.agruparCitaMedico();
        this.recorrerCitasMedicos( this.medicos );

      } else {
        this.ocultarApoyo = false;
        this.establecerHeigthContainerCita(0);
      }
      
    } else {
      this.form.controls.turno.setValue("");
      Swal.fire({
        title: 'Aviso!',
        text: 'Seleccione la fecha de cita',
        icon: "warning",
        timer: 3000
      })
    }    
  }

  establecerHeigthContainerCita( longitudMedicos: number ){
    if( longitudMedicos == 0 ){
      document.getElementById("container_cita").style.height = "39px";
    } else if( longitudMedicos == 1 ){
      this.heigth = "189px";
      document.getElementById("container_cita").style.height = this.heigth;
    } else {
      this.heigth = "339px";
      document.getElementById("container_cita").style.height = this.heigth;
    }
  }

  getNombreMedicoCompleto( personalMedico:PersonalMedicoModel): string{
    return personalMedico.nombres + ", " + personalMedico.apellidoPaterno + " " + personalMedico.apellidoMaterno;
  }

  agruparCitaMedico(){
    for (let index = 0; index < this.medicos.length; index++) {
      this.medicos[index].citas = [];
      this.citas.forEach( c => {
        if( c.personalMedico.personalMedicoId == this.medicos[index].personalMedico.personalMedicoId ){
          this.medicos[index].citas.push(c);
        }
      });
    }
  }

  recorrerCitasMedicos( listaHorarioMedico: HorarioMedicoModel[] ){
    listaHorarioMedico.forEach( hm => {
      hm.citas.forEach( c => {
        let t_he = c.horaCita.split("-")[0];
        let t_hs = c.horaCita.split("-")[1];
        let nombrePaciente = c.paciente.nombres + ", " + c.paciente.apellidoPaterno + " " + c.paciente.apellidoMaterno;
        this.pintarCitasRegistradas( hm, t_he, t_hs, nombrePaciente, c.citaMedicaId );
      });
    });
  }

  pintarCitasRegistradas( horarioMedico:HorarioMedicoModel, horaEntrada: string, 
    horaSalida:string, nombrePaciente: string, citaId:number ){
    for (let index = 0; index < horarioMedico.items.length; index++) {
      if(horarioMedico.items[index].he == horaEntrada && horarioMedico.items[index].hs == horaSalida ){
        horarioMedico.items[index].color = BACKGROUND_COLOR_OCUPADO;
        horarioMedico.items[index].nombrePaciente = nombrePaciente;
        horarioMedico.items[index].eliminar = true;
        horarioMedico.items[index].citaId = citaId;
        horarioMedico.items[index].tieneCita = true;
        break;
      }        
    }
  }

  async buscarServicios( areaMedicaId:number ): Promise<void> {
    this.cargando = true;
    this.servicios = await this.servicioService.listarPor(areaMedicaId);
    this.cargando = false;
    this.form.controls.turno.setValue("");
  }
}
