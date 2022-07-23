import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioMedicoModel } from 'src/app/definiciones/horario-medico.model';
import { PersonalMedicoModel } from 'src/app/definiciones/personal-medico.model';
import { PersonalMedicoService } from 'src/app/servicios/personal-medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configurar-horario-personal-medico',
  templateUrl: './configurar-horario-personal-medico.component.html',
  styleUrls: ['./configurar-horario-personal-medico.component.css']
})
export class ConfigurarHorarioPersonalMedicoComponent implements OnInit {

  cargando:boolean = false;
  mensajeCarga:string = "Cargando...";
  form: FormGroup;
  horariosEntradaManana: string[] = [
    "08:00","08:20","08:40","09:00","09:20","09:40","10:00","10:20","10:40","11:00","11:20","11:40",
    "12:00","12:20","12:40"
  ];

  horariosSalidaManana: string[] = [
    "08:20","08:40","09:00","09:20","09:40","10:00","10:20","10:40","11:00","11:20","11:40","12:00",
    "12:20","12:40","01:00"
  ];

  horariosEntradaTarde: string[] = [
    "14:00","14:20","14:40","15:00","15:20","15:40","16:00","16:20","16:40","17:00","17:20","17:40",
    "18:00","18:20","18:40"
  ];

  horariosSalidaTarde: string[] = [
    "14:20","14:40","15:00","15:20","15:40","16:00","16:20","16:40","17:00","17:20","17:40","18:00",
    "18:20","18:40","19:00"
  ];

  horariosEntradaNoche: string[] = [
    "19:00","19:20","19:40","20:00","20:20","20:40","21:00","21:20","21:40","22:00","22:20","22:40",
    "23:00","23:20","23:40"
  ];

  horariosSalidaNoche: string[] = [
    "19:20","19:40","20:00","20:20","20:40","21:00","21:20","21:40","22:00","22:20","22:40","23:00",
    "23:20","23:40","00:00"
  ];

  horarioMedico: HorarioMedicoModel = new HorarioMedicoModel();
  personalMedicoId: number = 0;
  personalMedico: PersonalMedicoModel;

  constructor( 
    private fb: FormBuilder,
    private personalMedicoService: PersonalMedicoService,
    private router: Router,
    private routerActived: ActivatedRoute ) { 

    this.personalMedicoId = routerActived.snapshot.params.id;
  }

  async ngOnInit(): Promise<void> {
    this.cargando = true;   
    this.crearForm();  
    this.horarioMedico = await this.personalMedicoService.consultarConfiguracionHorario(this.personalMedicoId);
    this.personalMedico = await this.personalMedicoService.buscarPorId(this.personalMedicoId);
    this.crearForm();
    this.cargando = false;
  }
  
  crearForm(){    
    this.form = this.fb.group({
      tm_lunes_he: [ this.horarioMedico.tmLunes == "-" ? "" : this.horarioMedico.tmLunes.split("-")[0] ],
      tm_lunes_hs: [ this.horarioMedico.tmLunes == "-" ? "" : this.horarioMedico.tmLunes.split("-")[1] ],
      tt_lunes_he: [ this.horarioMedico.ttLunes == "-" ? "" : this.horarioMedico.ttLunes.split("-")[0] ],
      tt_lunes_hs: [ this.horarioMedico.ttLunes == "-" ? "" : this.horarioMedico.ttLunes.split("-")[1] ],
      tn_lunes_he: [ this.horarioMedico.tnLunes == "-" ? "" : this.horarioMedico.tnLunes.split("-")[0] ],
      tn_lunes_hs: [ this.horarioMedico.tnLunes == "-" ? "" : this.horarioMedico.tnLunes.split("-")[1] ],

      tm_martes_he: [ this.horarioMedico.tmMartes == "-" ? "" : this.horarioMedico.tmMartes.split("-")[0] ],
      tm_martes_hs: [ this.horarioMedico.tmMartes == "-" ? "" : this.horarioMedico.tmMartes.split("-")[1] ],
      tt_martes_he: [ this.horarioMedico.ttMartes == "-" ? "" : this.horarioMedico.ttMartes.split("-")[0] ],
      tt_martes_hs: [ this.horarioMedico.ttMartes == "-" ? "" : this.horarioMedico.ttMartes.split("-")[1] ],
      tn_martes_he: [ this.horarioMedico.tnMartes == "-" ? "" : this.horarioMedico.tnMartes.split("-")[0] ],
      tn_martes_hs: [ this.horarioMedico.tnMartes == "-" ? "" : this.horarioMedico.tnMartes.split("-")[1] ],

      tm_miercoles_he: [ this.horarioMedico.tmMiercoles == "-" ? "" : this.horarioMedico.tmMiercoles.split("-")[0] ],
      tm_miercoles_hs: [ this.horarioMedico.tmMiercoles == "-" ? "" : this.horarioMedico.tmMiercoles.split("-")[1] ],
      tt_miercoles_he: [ this.horarioMedico.ttMiercoles == "-" ? "" : this.horarioMedico.ttMiercoles.split("-")[0] ],
      tt_miercoles_hs: [ this.horarioMedico.ttMiercoles == "-" ? "" : this.horarioMedico.ttMiercoles.split("-")[1] ],
      tn_miercoles_he: [ this.horarioMedico.tnMiercoles == "-" ? "" : this.horarioMedico.tnMiercoles.split("-")[0] ],
      tn_miercoles_hs: [ this.horarioMedico.tnMiercoles == "-" ? "" : this.horarioMedico.tnMiercoles.split("-")[1] ],

      tm_jueves_he: [ this.horarioMedico.tmJueves == "-" ? "" : this.horarioMedico.tmJueves.split("-")[0] ],
      tm_jueves_hs: [ this.horarioMedico.tmJueves == "-" ? "" : this.horarioMedico.tmJueves.split("-")[1] ],
      tt_jueves_he: [ this.horarioMedico.ttJueves == "-" ? "" : this.horarioMedico.ttJueves.split("-")[0] ],
      tt_jueves_hs: [ this.horarioMedico.ttJueves == "-" ? "" : this.horarioMedico.ttJueves.split("-")[1] ],
      tn_jueves_he: [ this.horarioMedico.tnJueves == "-" ? "" : this.horarioMedico.tnJueves.split("-")[0] ],
      tn_jueves_hs: [ this.horarioMedico.tnJueves == "-" ? "" : this.horarioMedico.tnJueves.split("-")[1] ],

      tm_viernes_he: [ this.horarioMedico.tmViernes == "-" ? "" : this.horarioMedico.tmViernes.split("-")[0] ],
      tm_viernes_hs: [ this.horarioMedico.tmViernes == "-" ? "" : this.horarioMedico.tmViernes.split("-")[1] ],
      tt_viernes_he: [ this.horarioMedico.ttViernes == "-" ? "" : this.horarioMedico.ttViernes.split("-")[0] ],
      tt_viernes_hs: [ this.horarioMedico.ttViernes == "-" ? "" : this.horarioMedico.ttViernes.split("-")[1] ],
      tn_viernes_he: [ this.horarioMedico.tnViernes == "-" ? "" : this.horarioMedico.tnViernes.split("-")[0] ],
      tn_viernes_hs: [ this.horarioMedico.tnViernes == "-" ? "" : this.horarioMedico.tnViernes.split("-")[1] ],
      
      tm_sabado_he: [ this.horarioMedico.tmSabado == "-" ? "" : this.horarioMedico.tmSabado.split("-")[0] ],
      tm_sabado_hs: [ this.horarioMedico.tmSabado == "-" ? "" : this.horarioMedico.tmSabado.split("-")[1] ],
      tt_sabado_he: [ this.horarioMedico.ttSabado == "-" ? "" : this.horarioMedico.ttSabado.split("-")[0] ],
      tt_sabado_hs: [ this.horarioMedico.ttSabado == "-" ? "" : this.horarioMedico.ttSabado.split("-")[1] ],
      tn_sabado_he: [ this.horarioMedico.tnSabado == "-" ? "" : this.horarioMedico.tnSabado.split("-")[0] ],
      tn_sabado_hs: [ this.horarioMedico.tnSabado == "-" ? "" : this.horarioMedico.tnSabado.split("-")[1] ],

      tm_domingo_he: [ this.horarioMedico.tmDomingo == "-" ? "" : this.horarioMedico.tmDomingo.split("-")[0] ],
      tm_domingo_hs: [ this.horarioMedico.tmDomingo == "-" ? "" : this.horarioMedico.tmDomingo.split("-")[1] ],
      tt_domingo_he: [ this.horarioMedico.ttDomingo == "-" ? "" : this.horarioMedico.ttDomingo.split("-")[0] ],
      tt_domingo_hs: [ this.horarioMedico.ttDomingo == "-" ? "" : this.horarioMedico.ttDomingo.split("-")[1] ],
      tn_domingo_he: [ this.horarioMedico.tnDomingo == "-" ? "" : this.horarioMedico.tnDomingo.split("-")[0] ],
      tn_domingo_hs: [ this.horarioMedico.tnDomingo == "-" ? "" : this.horarioMedico.tnDomingo.split("-")[1] ]
    });
  }

  async registrar(): Promise<void> {

    this.cargando = true;
    this.mensajeCarga = "Guardando...";

    let horarioMedico = new HorarioMedicoModel();

    horarioMedico.tmLunes = this.form.get("tm_lunes_he").value.concat("-").concat(this.form.get("tm_lunes_hs").value);
    horarioMedico.tmMartes = this.form.get("tm_martes_he").value.concat("-").concat(this.form.get("tm_martes_hs").value);
    horarioMedico.tmMiercoles = this.form.get("tm_miercoles_he").value.concat("-").concat(this.form.get("tm_miercoles_hs").value);
    horarioMedico.tmJueves = this.form.get("tm_jueves_he").value.concat("-").concat(this.form.get("tm_jueves_hs").value);
    horarioMedico.tmViernes = this.form.get("tm_viernes_he").value.concat("-").concat(this.form.get("tm_viernes_hs").value);
    horarioMedico.tmSabado = this.form.get("tm_sabado_he").value.concat("-").concat(this.form.get("tm_sabado_hs").value);
    horarioMedico.tmDomingo = this.form.get("tm_domingo_he").value.concat("-").concat(this.form.get("tm_domingo_hs").value);

    horarioMedico.ttLunes = this.form.get("tt_lunes_he").value.concat("-").concat(this.form.get("tt_lunes_hs").value);
    horarioMedico.ttMartes = this.form.get("tt_martes_he").value.concat("-").concat(this.form.get("tt_martes_hs").value);
    horarioMedico.ttMiercoles = this.form.get("tt_miercoles_he").value.concat("-").concat(this.form.get("tt_miercoles_hs").value);
    horarioMedico.ttJueves = this.form.get("tt_jueves_he").value.concat("-").concat(this.form.get("tt_jueves_hs").value);
    horarioMedico.ttViernes = this.form.get("tt_viernes_he").value.concat("-").concat(this.form.get("tt_viernes_hs").value);
    horarioMedico.ttSabado = this.form.get("tt_sabado_he").value.concat("-").concat(this.form.get("tt_sabado_hs").value);
    horarioMedico.ttDomingo = this.form.get("tt_domingo_he").value.concat("-").concat(this.form.get("tt_domingo_hs").value);

    horarioMedico.tnLunes = this.form.get("tn_lunes_he").value.concat("-").concat(this.form.get("tn_lunes_hs").value);
    horarioMedico.tnMartes = this.form.get("tn_martes_he").value.concat("-").concat(this.form.get("tn_martes_hs").value);
    horarioMedico.tnMiercoles = this.form.get("tn_miercoles_he").value.concat("-").concat(this.form.get("tn_miercoles_hs").value);
    horarioMedico.tnJueves = this.form.get("tn_jueves_he").value.concat("-").concat(this.form.get("tn_jueves_hs").value);
    horarioMedico.tnViernes = this.form.get("tn_viernes_he").value.concat("-").concat(this.form.get("tn_viernes_hs").value);
    horarioMedico.tnSabado = this.form.get("tn_sabado_he").value.concat("-").concat(this.form.get("tn_sabado_hs").value);
    horarioMedico.tnDomingo = this.form.get("tn_domingo_he").value.concat("-").concat(this.form.get("tn_domingo_hs").value);
    horarioMedico.personalMedicoId = this.personalMedicoId;
    horarioMedico.horarioMedicoId = this.horarioMedico.horarioMedicoId;

    try {
      this.personalMedicoService.configurarHorario(horarioMedico);
      this.router.navigate(['/personal-medico/listar']);

      Swal.fire( 'Éxito', 'Se guardó la configuración correctamente', 'success' );

    } catch (error) {
      if( error.status == 400 ){
        Swal.fire( 'Aviso', error.error, 'warning' );
      } else {
        Swal.fire( 'Error', error.error, 'error' );
      }
    }
  }
}
