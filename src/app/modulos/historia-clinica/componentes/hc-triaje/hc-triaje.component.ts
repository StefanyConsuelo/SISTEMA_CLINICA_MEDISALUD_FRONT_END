import { Component, OnInit } from '@angular/core';
import { HistoriaClinicaModel } from 'src/app/definiciones/historia-clinica.model';
import { PacienteModel } from 'src/app/definiciones/paciente.model';
import { LoginService } from 'src/app/servicios/login.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hc-triaje',
  templateUrl: './hc-triaje.component.html',
  styleUrls: ['./hc-triaje.component.css']
})
export class HcTriajeComponent implements OnInit {

  fecha_actualizacion:string = "";
  peso?:string;
  talla?:string;

  cargando : boolean = false;
  mensajeCarga : string = "Cargando datos...";

  constructor(
    private pacienteService: PacienteService,
    private tokenService: LoginService
  ) { }

  ngOnInit(): void {
    this.listarUltimoTriaje();
  }

  async guardar(): Promise<void>{
    console.log(this.peso);
    console.log(this.talla);

    let paciente = new PacienteModel();

    paciente.peso = this.peso;
    paciente.talla = this.talla;
    paciente.historiaClinica = new HistoriaClinicaModel();
    paciente.historiaClinica.historiaClinicaId = Number.parseInt(document.getElementById("historiaClinicaId").dataset.historiaclinicaid);

    const res = await this.pacienteService.editarTriaje(paciente);

    Swal.fire('Éxito!','Se actualizó el triaje correctamente.','success');

    this.listarUltimoTriaje();
  }

  async listarUltimoTriaje(): Promise<void>{
    this.cargando = false;      
    let datasetHistoriaClinicaId = document.getElementById("historiaClinicaId").dataset.historiaclinicaid;
    const res = await this.pacienteService.listarUltimoTriaje(datasetHistoriaClinicaId);
    this.peso = res.peso;
    this.talla = res.talla;
    this.fecha_actualizacion = res.fechaActualTriaje;
    this.cargando = false;      
  }
}
