import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CitaMedicaModel } from '../definiciones/cita-medica.model';
import { PaginadorModel } from '../definiciones/paginador.model';

@Injectable({
  providedIn: 'root'
})
export class CitaMedicaService {

  constructor(private httpCliente: HttpClient) { }

  async listarPor( servicioId:number, fechaCita:string ): Promise<CitaMedicaModel[]> {
    const res = await this.httpCliente.post<any>("http://localhost:9094/citas-medicas/servicio/fecha", {
      servicioId: servicioId,
      fechaCita: fechaCita
    }).toPromise();
    return res;
  }

  async registrar( citaMedica:CitaMedicaModel ): Promise<CitaMedicaModel[]> {
    const res = await this.httpCliente.post<any>("http://localhost:9094/citas-medicas", citaMedica).toPromise();
    return res;
  }

  async listarPaginado( parametros:any ): Promise<PaginadorModel> {
    const res = await this.httpCliente.post<any>("http://localhost:9094/citas-medicas/paginado", parametros).toPromise();
    return res;
  }

  async eliminar( citaMedicaId:number ): Promise<Boolean> {
    const res = await this.httpCliente.delete<any>(`http://localhost:9094/citas-medicas/${citaMedicaId}`).toPromise();
    return res;
  }

  async listarPorPersonaId( personaId:number, fecha:string ): Promise<CitaMedicaModel[]> {
    const res = await this.httpCliente.get<any>(`http://localhost:9094/citas-medicas/${personaId}/${fecha}`).toPromise();
    return res;
  }

  async atender( citaId:number ): Promise<CitaMedicaModel[]> {
    const res = await this.httpCliente.get<any>(`http://localhost:9094/citas-medicas/${citaId}/atender`).toPromise();
    return res;
  }
}
