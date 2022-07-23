import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoModel } from 'src/app/definiciones/departamento.model';
import { DistritoModel } from 'src/app/definiciones/distrito.model';
import { PacienteModel } from 'src/app/definiciones/paciente.model';
import { ProvinciaModel } from 'src/app/definiciones/provincia.model';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import { DistritoService } from 'src/app/servicios/distrito.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { ProvinciaService } from 'src/app/servicios/provincia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css'],
  providers: [DatePipe]
})
export class CrearPacienteComponent implements OnInit {

  cargando:boolean = false;
  mensajeCarga:string = "Cargando datos...";
  form: FormGroup;
  bloquear:boolean=false;
  departamentos: DepartamentoModel[] = [];
  provincias: ProvinciaModel[] = [];
  distritos: DistritoModel[] = [];
  paciente: PacienteModel;
  pacienteId: number;
  quitarBotonCancel: boolean = false;

  constructor( 
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private departamentoService: DepartamentoService,
    private provinciaService: ProvinciaService,
    private distritoService: DistritoService,
    private pacienteService: PacienteService,
    private router: Router,
    private routerActivated: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<CrearPacienteComponent> ) { 
    
    this.pacienteId = this.routerActivated.snapshot.params.id;
    this.quitarBotonCancel = data?.quitarBotonCancel
  }

  async ngOnInit(): Promise<void> {
    this.crearForm();
    this.cargando = true;
    this.departamentos = await this.departamentoService.listarTodos();
    if(this.pacienteId){
      this.bloquear = true;
      this.paciente = await this.pacienteService.buscarPorId(this.pacienteId);
      this.provincias = await this.provinciaService.listarPor(this.paciente.distrito.provincia.departamento.departamentoId);
      this.distritos = await this.distritoService.listarPor(this.paciente.distrito.provincia.provinciaId);
      this.crearForm();
    } else {
      this.paciente = new PacienteModel();
    }
    
    this.cargando = false;
  }

  crearForm(){
    this.form = this.fb.group({
      nombres: [ this.paciente?.nombres, Validators.required ],
      paterno: [ this.paciente?.apellidoPaterno, Validators.required ],
      materno: [ this.paciente?.apellidoMaterno, Validators.required ],
      tipoDocumento: [ this.paciente?.tipoDocumento, Validators.required ],
      numeroDocumento: [this.paciente?.numeroDocumento, Validators.required ],
      fechaNacimiento: [this.paciente?.fechaNacimiento, Validators.required ],
      genero: [this.paciente?.genero, Validators.required ],
      estadoCivil: [this.paciente?.estadoCivil],
      grupoSanguineo: [this.paciente?.grupoSanguineo],
      canal: [this.paciente?.canal],
      religion: [this.paciente?.religion],
      lugarNacimiento: [this.paciente?.lugarNacimiento],
      tipoPaciente: [this.paciente?.tipoPaciente],
      departamento: [this.paciente?.distrito?.provincia?.departamento?.departamentoId, Validators.required],
      provincia:[this.paciente?.distrito?.provincia?.provinciaId, Validators.required],
      distrito:[this.paciente?.distrito?.distritoId, Validators.required],
      telefonoFijo: [this.paciente?.telefonoFijo],
      celular: [this.paciente?.celular],
      correo: [this.paciente?.correo],     
      direccion:[this.paciente?.direccion],
      responsableNombresApellidos:[this.paciente?.responsableNombresApellidos],
      responsableParentesco:[this.paciente?.responsableParentescoPaciente],
      responsableTelefono:[this.paciente?.responsableTelefono]
    });
  }

  async registrar(): Promise<void> {
    this.cargando = true;
    this.mensajeCarga = "Guardando...";
    let paciente = new PacienteModel();
    let mensaje = "";

    paciente.nombres = this.form.get("nombres").value;
    paciente.apellidoPaterno = this.form.get("paterno").value;
    paciente.apellidoMaterno = this.form.get("materno").value;
    paciente.tipoDocumento = this.form.get("tipoDocumento").value;
    paciente.numeroDocumento = this.form.get("numeroDocumento").value;
    paciente.fechaNacimiento = this.datePipe.transform(this.form.get("fechaNacimiento").value, 'yyyy-MM-dd'); 
    paciente.telefonoFijo = this.form.get("telefonoFijo").value;
    paciente.celular = this.form.get("celular").value;
    paciente.correo = this.form.get("correo").value;
    paciente.genero = this.form.get("genero").value;
    paciente.estadoCivil = this.form.get("estadoCivil").value;
    paciente.grupoSanguineo = this.form.get("grupoSanguineo").value;
    paciente.canal = this.form.get("canal").value;
    paciente.religion = this.form.get("religion").value;
    paciente.lugarNacimiento = this.form.get("lugarNacimiento").value;
    paciente.tipoPaciente = this.form.get("tipoPaciente").value;
    paciente.distritoId = this.form.get("distrito").value;
    paciente.telefonoFijo = this.form.get("telefonoFijo").value;
    paciente.direccion = this.form.get("direccion").value;
    paciente.responsableNombresApellidos = this.form.get("responsableNombresApellidos").value;
    paciente.responsableParentescoPaciente = this.form.get("responsableParentesco").value;
    paciente.responsableTelefono = this.form.get("responsableTelefono").value;
    paciente.pacienteId = this.paciente.pacienteId;

    let pacienteResp = null;
    try {

      if(this.paciente.pacienteId){
        await this.pacienteService.editar(paciente);
        mensaje = "Se guardó los cambios correctamente.";
      } else {
        pacienteResp = await this.pacienteService.registrar(paciente);
        mensaje = "Se registro el paciente correctamente.";
      }

      this.cargando = false;
      if( this.quitarBotonCancel ){
        this.dialogRef.close({
          guardo: true,
          paciente: pacienteResp
        });
      } else {
        this.router.navigate(['/paciente/listar']);
      }
      
      Swal.fire( 'Éxito', mensaje, 'success' );

    } catch (error) {
      if( error.status == 400 ){
        Swal.fire( 'Aviso', error.error, 'warning' );
      } else {
        Swal.fire( 'Error', error.error, 'error' );
      }
      this.cargando = false;
      if( this.quitarBotonCancel ){
        this.dialogRef.close({
          guardo: false
        });
      }
    }
  }

  async buscarProvincias( departamentoId:number ): Promise<void> {
    if(departamentoId != 0){
      this.cargando = true;
      this.distritos = [];
      this.provincias = await this.provinciaService.listarPor(departamentoId);
      this.form.controls.provincia.setValue("");
      this.cargando = false;
    }
  }

  async buscarDistritos( provinciaId:number ): Promise<void> {
    if(provinciaId != 0 ){
      this.cargando = true;
      this.distritos = await this.distritoService.listarPor(provinciaId);
      this.form.controls.distrito.setValue("");
      this.cargando = false;
    }
  }
}
