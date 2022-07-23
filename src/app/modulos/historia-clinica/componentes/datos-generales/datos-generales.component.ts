import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PacienteModel } from 'src/app/definiciones/paciente.model';
import { PacienteService } from 'src/app/servicios/paciente.service';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {

  @ViewChild("nombres") nombres: ElementRef;
  @ViewChild("apellidoPaterno") apellidoPaterno: ElementRef;
  @ViewChild("apellidoMaterno") apellidoMaterno: ElementRef;
  @ViewChild("tipoDocumento") tipoDocumento: ElementRef;
  @ViewChild("numeroDocumento") numeroDocumento: ElementRef;
  @ViewChild("fechaNacimiento") fechaNacimiento: ElementRef;
  @ViewChild("telefonoFijo") telefonoFijo: ElementRef;
  @ViewChild("celular") celular: ElementRef;
  @ViewChild("correo") correo: ElementRef;
  @ViewChild("genero") genero: ElementRef;
  @ViewChild("estadoCivil") estadoCivil: ElementRef;
  @ViewChild("grupoSanguineo") grupoSanguineo: ElementRef;
  @ViewChild("canal") canal: ElementRef;
  @ViewChild("religion") religion: ElementRef;
  @ViewChild("lugarNacimiento") lugarNacimiento: ElementRef;
  @ViewChild("tipoPaciente") tipoPaciente: ElementRef;
  @ViewChild("direccion") direccion: ElementRef;
  @ViewChild("responsableNombresApellidos") responsableNombresApellidos: ElementRef;
  @ViewChild("responsableParentescoPaciente") responsableParentescoPaciente: ElementRef;
  @ViewChild("responsableTelefono") responsableTelefono: ElementRef;

  @Input() pacienteId: number = 0;
  paciente: PacienteModel;

  constructor(
    private pacienteService: PacienteService
  ) { }

  async ngOnInit(): Promise<void> {
    this.paciente = new PacienteModel();
    this.paciente = await this.pacienteService.buscarPorId(this.pacienteId);
    this.establecerDatosPaciente(this.paciente);
  }

  establecerDatosPaciente( p: PacienteModel ): void {
    this.nombres.nativeElement.value = p.nombres;
    this.apellidoPaterno.nativeElement.value = p.apellidoPaterno;
    this.apellidoMaterno.nativeElement.value = p.apellidoMaterno;
    this.tipoDocumento.nativeElement.value = p.tipoDocumento;
    this.numeroDocumento.nativeElement.value = p.numeroDocumento;
    this.fechaNacimiento.nativeElement.value = p.fechaNacimiento;
    this.telefonoFijo.nativeElement.value = p.telefonoFijo;
    this.celular.nativeElement.value = p.celular;
    this.correo.nativeElement.value = p.correo;
    this.genero.nativeElement.value = p.genero;
    this.estadoCivil.nativeElement.value = p.estadoCivil;
    this.grupoSanguineo.nativeElement.value = p.grupoSanguineo;
    this.canal.nativeElement.value = p.canal;
    this.religion.nativeElement.value = p.religion;
    this.lugarNacimiento.nativeElement.value = p.lugarNacimiento;
    this.tipoPaciente.nativeElement.value = p.tipoPaciente;
    this.direccion.nativeElement.value = p.direccion;
    this.responsableNombresApellidos.nativeElement.value = p.responsableNombresApellidos;
    this.responsableParentescoPaciente.nativeElement.value = p.responsableParentescoPaciente;
    this.responsableTelefono.nativeElement.value = p.responsableTelefono;
  }
}
