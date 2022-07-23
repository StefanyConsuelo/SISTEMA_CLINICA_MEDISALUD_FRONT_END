import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlantillaReporteModel } from '../definiciones/plantilla-reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor( private httpCliente:HttpClient ) { }

  async reportePacientesRegistradosAnualmente( year:number ): Promise<PlantillaReporteModel[]> {
    const paginador = await this.httpCliente.get<any>(`http://localhost:9094/reportes/pacientes/${year}`).toPromise();
    return paginador;
  }

  async reportePacientesRecomendadosCanalAnualmente( year:number ): Promise<PlantillaReporteModel[]> {
    const paginador = await this.httpCliente.get<any>(`http://localhost:9094/reportes/pacientes/canal/${year}`).toPromise();
    return paginador;
  }

  async reporteCitasGeneradasAnualmente( year:number ): Promise<PlantillaReporteModel[]> {
    const paginador = await this.httpCliente.get<any>(`http://localhost:9094/reportes/citas-medicas/${year}`).toPromise();
    return paginador;
  }

  async reportePacientesHospitalizadosAnualmente( year:number ): Promise<PlantillaReporteModel[]> {
    const paginador = await this.httpCliente.get<any>(`http://localhost:9094/reportes/hospitalizaciones/${year}`).toPromise();
    return paginador;
  }

  async reporteServiciosMasUtilizadosCitasAnualmente( year:number, areaMedicaId:number ): Promise<PlantillaReporteModel[]> {
    const paginador = await this.httpCliente.get<any>(
      `http://localhost:9094/reportes/citas-medicas/anio/${year}/areas-medicas/${areaMedicaId}`).toPromise();
    return paginador;
  }

  async reporteCantidadTotalPacientesAnualmente(): Promise<number> {
    const paginador = await this.httpCliente.get<any>(`http://localhost:9094/reportes/pacientes/totales/anualmente`).toPromise();
    return paginador;
  }

  async reporteCantidadTotalCitasAnualmente(): Promise<number> {
    const paginador = await this.httpCliente.get<any>(`http://localhost:9094/reportes/citas-medicas/totales/anualmente`).toPromise();
    return paginador;
  }

  async reporteCantidadTotalHospitalizacionAnualmente(): Promise<number> {
    const paginador = await this.httpCliente.get<any>(`http://localhost:9094/reportes/hospitalizaciones/totales/anualmente`).toPromise();
    return paginador;
  }

  async reporteCantidadTotalPersonalMedicoAnualmente(): Promise<number> {
    const paginador = await this.httpCliente.get<any>(`http://localhost:9094/reportes/personal-medico/totales/anualmente`).toPromise();
    return paginador;
  }
}
