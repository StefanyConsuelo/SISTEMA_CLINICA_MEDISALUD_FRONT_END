import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CamaModel } from 'src/app/definiciones/cama.model';
import { CitaMedicaModel } from 'src/app/definiciones/cita-medica.model';
import { HospitalizacionModel } from 'src/app/definiciones/hospitalizacion.model';
import { CamaService } from 'src/app/servicios/cama.service';
import { DosisMedicacionService } from 'src/app/servicios/dosis-medicacion.service';
import { HospitalizacionService } from 'src/app/servicios/hospitalizacion.service';
import Swal from 'sweetalert2';

const BACKGROUND_COLOR_OCUPADO = "background-color: #B99BF8 !important;";
const BACKGROUND_COLOR_ALERTA = "background-color: #E00F48 !important;";
const COLOR_TEXT_ALERTA = "color: #EEE8E8 !important;";

@Component({
  selector: 'app-listar-hospitalizacion',
  templateUrl: './listar-hospitalizacion.component.html',
  styleUrls: ['./listar-hospitalizacion.component.css']
})
export class ListarHospitalizacionComponent implements OnInit {

  cargando:boolean = false;
  mensajeCarga:string = "Cargando datos...";
  camas: CamaModel[] = [];
  hospitalizados:HospitalizacionModel[] = [];
  pacientesIds: number[] =[];
  alertaIntervalo = null;

  constructor( 
    private camaService: CamaService,
    private hospitalizacionService: HospitalizacionService,
    private dosisService: DosisMedicacionService,
    private router: Router ) { 

    this.alertaIntervalo = setInterval( async () => {
      const dateHoy = new Date();
      const segundo = dateHoy.getSeconds();

      if(segundo == 1 && this.pacientesIds.length > 0){
        const res = await this.dosisService.alertarDosisPacientes(this.pacientesIds);
        res.forEach( pacienteId => {
          this.camas.forEach( c => {
            if( c.hospitalizado && c.hospitalizado.paciente){
              if( c.hospitalizado.paciente.pacienteId == pacienteId ){
                c.color = BACKGROUND_COLOR_ALERTA;
              }
            }
          })
        });
      }
    }, 1000 );
  }

  ngOnDestroy() {
    if (this.alertaIntervalo) {
      clearInterval(this.alertaIntervalo);
    }
  }

  async ngOnInit(): Promise<void> {
    this.cargando = true;
    const res = await this.camaService.listarTodos();
    this.camas = res;
    this.actualizarCamas();
    this.cargando = false;
  }

  mostrarFormularioRegistro( cama: CamaModel ){
    console.log("mostrarFormularioRegistro");
    console.log(cama);
    
    clearInterval(this.alertaIntervalo);
    if(cama.hospitalizado){
      this.router.navigate(['/hospitalizacion/editar'], {
        queryParams: { 
          "camaId": cama.camaId,
          "historiaClinicaId": cama.hospitalizado.paciente.historiaClinica.historiaClinicaId,
          "hospitalizacionId": cama.hospitalizado.hospitalizacionId,
          "alta": cama.hospitalizado.alta,
          "nombrePaciente" : cama.hospitalizado.paciente.nombres + " " + cama.hospitalizado.paciente.apellidoPaterno + " " + cama.hospitalizado.paciente.apellidoMaterno,
          "numeroHistoriaClinica" : cama.hospitalizado.paciente.historiaClinica.numeroHistoriaClinica
        }
      });
    } else {
      this.router.navigate(['/hospitalizacion/crear'], {
        queryParams: { "camaId": cama.camaId }
      });
    }
  }

  async actualizarCamas(): Promise<void>{
    const res = await this.hospitalizacionService.listarTodos();
    this.hospitalizados = res;
    console.log(this.hospitalizados);
    
    this.hospitalizados.forEach( h => {
      this.pacientesIds.push( h.paciente.pacienteId );
    });

    this.camas.forEach( c => {
      this.hospitalizados.forEach( h => {
        if( h.cama.camaId == c.camaId ){
          c.hospitalizado = h;
          c.color = BACKGROUND_COLOR_OCUPADO;
          c.colorText = COLOR_TEXT_ALERTA;
        }
      })
    });

    if(this.pacientesIds.length > 0){
      const res = await this.dosisService.alertarDosisPacientes(this.pacientesIds);
      res.forEach( pacienteId => {
        this.camas.forEach( c => {
          if( c.hospitalizado && c.hospitalizado.paciente){
            if( c.hospitalizado.paciente.pacienteId == pacienteId ){
              c.color = BACKGROUND_COLOR_ALERTA;
              c.colorText = COLOR_TEXT_ALERTA;
            }
          }
        })
      });
    }
  }

  getNombrePaciente( c:CamaModel ): string{
    if(c.hospitalizado){
      if(c.hospitalizado.paciente){
        return c.hospitalizado.paciente.nombres + ", " + c.hospitalizado.paciente.apellidoPaterno + " " + c.hospitalizado.paciente.apellidoMaterno;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  getNombrePersonalMedico( c:CamaModel ): string{
    if(c.hospitalizado){
      if(c.hospitalizado.personalMedico){
        return c.hospitalizado.personalMedico.nombres + ", " + c.hospitalizado.personalMedico.apellidoPaterno + " " + c.hospitalizado.personalMedico.apellidoMaterno;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
}