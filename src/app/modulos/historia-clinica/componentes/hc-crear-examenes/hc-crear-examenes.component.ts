import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaMedicaModel } from 'src/app/definiciones/area-medica.model';
import { ExamenModel } from 'src/app/definiciones/examen.model';
import { HistoriaClinicaModel } from 'src/app/definiciones/historia-clinica.model';
import { PersonalMedicoModel } from 'src/app/definiciones/personal-medico.model';
import { ServicioModel } from 'src/app/definiciones/servicio.model';
import { AreaMedicaService } from 'src/app/servicios/area-medica.service';
import { ExamenService } from 'src/app/servicios/examen.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hc-crear-examenes',
  templateUrl: './hc-crear-examenes.component.html',
  styleUrls: ['./hc-crear-examenes.component.css']
})
export class HcCrearExamenesComponent implements OnInit {

  form: FormGroup;
  cargando: boolean = false;
  mensajeCarga: string = "Guardando datos...";

  @Output() notificarRegistroNuevo: EventEmitter<any> = new EventEmitter();

  servicios   : ServicioModel[] = [];
  areasMedicas: AreaMedicaModel[] = [];

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private areaMedicaService: AreaMedicaService,
    private examenService: ExamenService,
    private tokenService: LoginService
  ) { }

  async ngOnInit(): Promise<void> {
    this.crearForm();
    this.cargando = true;
    const areas = await this.areaMedicaService.listarTodos();
    this.areasMedicas = areas.filter( a => a.nombre == 'EXAMENES');
    this.cargando = false;
    this.crearForm();
  }

  crearForm(){
    this.form = this.fb.group({
      areaMedica: ['', Validators.required],
      servicio: ['', Validators.required]
    });
  }

  async registrar(): Promise<void>{

    let examen = new ExamenModel();

    this.mensajeCarga = "Guardando examen...";
    this.cargando = true;

    let datasetHistoriaClinicaId = document.getElementById("historiaClinicaId").dataset.historiaclinicaid;

    examen.servicio = new ServicioModel();
    examen.servicio.servicioId = this.form.get("servicio").value;
    examen.historiaClinica = new HistoriaClinicaModel();
    examen.historiaClinica.historiaClinicaId = Number.parseInt(datasetHistoriaClinicaId);
    examen.personalMedico = new PersonalMedicoModel();
    examen.personalMedico.personaId = this.tokenService.getDataDesdeToken().personaId;

    try {
      const res = await this.examenService.registrar(examen);

      console.log("resp");
      console.log(res);      
      
      Swal.fire("Éxito", "Se registró el examen correctamente.", "success");
      
      this.notificarRegistroNuevo.emit(examen);
      this.cargando = false;
      this.crearForm();
    } catch (error) {
      Swal.fire("Error", "Error en el sistema", "error");
    }
    this.cargando = false;
    
  }

  async buscarServicios( areaMedicaId:number ): Promise<void> {
    this.cargando = true;
    this.servicios = await this.servicioService.listarPor(areaMedicaId); 
    this.cargando = false;
  }
}
