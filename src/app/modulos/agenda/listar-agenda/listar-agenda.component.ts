import { DatePipe } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { CitaMedicaModel } from 'src/app/definiciones/cita-medica.model';
import { CitaMedicaService } from 'src/app/servicios/cita-medica.service';
import { LoginService } from 'src/app/servicios/login.service';
import Swal from 'sweetalert2';
import { getNuevosItemsTurnoManana, getNuevosItemsTurnoNoche, getNuevosItemsTurnoTarde, TITULOS_HORARIO_MANANA, TITULOS_HORARIO_NOCHE, TITULOS_HORARIO_TARDE, TURNO_MANANA, TURNO_NOCHE, TURNO_TARDE } from '../../cita-medica/util/data';

@Component({
  selector: 'app-listar-agenda',
  templateUrl: './listar-agenda.component.html',
  styleUrls: ['./listar-agenda.component.css'],
  providers: [DatePipe]
})
export class ListarAgendaComponent implements OnInit {

  items     : any[] = [];
  fechaCita = new Date();
  cargando  : boolean = false;
  mensajeCarga: string = "Cargando agenda...";
  turno: string = "1";

  constructor( 
    private loginService: LoginService,
    private citaService: CitaMedicaService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.actualizarTurnos(1);
  }

  actualizarTurnos( turno:number ){
    if(turno == TURNO_MANANA){
      TITULOS_HORARIO_MANANA.splice(0,1);
      this.items = getNuevosItemsTurnoManana("");
      this.items.splice(0,1);
    } else if( turno == TURNO_TARDE ){
      TITULOS_HORARIO_TARDE.splice(0,1);
      this.items = getNuevosItemsTurnoTarde("");
      this.items.splice(0,1);
    } else if( turno == TURNO_NOCHE ){
      TITULOS_HORARIO_NOCHE.splice(0,1);
      this.items = getNuevosItemsTurnoNoche("");
      this.items.splice(0,1);
    } else {
      this.items = [];
    }
    const fechaCitaReq = this.datePipe.transform(this.fechaCita, 'yyyy-MM-dd');
    if(fechaCitaReq && this.items.length > 0)
      this.buscarCitas();
  }

  async buscarCitas(): Promise<void>{
    this.items.forEach( e => {e.tieneCita = false; e.citaId=0 });
    const personaId = this.loginService.getDataDesdeToken().personaId;
    const fechaCitaReq = this.datePipe.transform(this.fechaCita, 'yyyy-MM-dd');
    if(!personaId)
      Swal.fire('Aviso','No se encontró al personal medico','warning');
    else {
      this.cargando = true;
      const res = await this.citaService.listarPorPersonaId(personaId, fechaCitaReq);
      console.log(res);
      
      res.forEach(e => {
        let he = e.horaCita.split("-")[0];
        let hs = e.horaCita.split("-")[1];
        this.items.forEach( i => {
          if( i.he == he && i.hs == hs ){
            i.tieneCita = true;
            i.cita = e;
          }
        });
      });
      this.cargando = false;
    }
  }

  async atender( cita:CitaMedicaModel ): Promise<void>{
    Swal.fire({
      title: `¿Se atendió la cita Nro. ${cita.numeroCitaMedica}?`,
      text: 'Al presionar si, se procede a finalizar la cita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then( async (result) => {
      if (result.value) {
        try {
          this.cargando = true;
          this.mensajeCarga = "Guardando...";
          const res = await this.citaService.atender(cita.citaMedicaId);
          Swal.fire('Atentido!','Se finalizó la cita.','success');
          this.buscarCitas();
        } catch (error) {
          Swal.fire('Error!','Error de cita.','error');
        }
      }
    });
  }

}
