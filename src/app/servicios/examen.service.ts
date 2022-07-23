import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExamenModel } from '../definiciones/examen.model';
import { PaginadorModel } from '../definiciones/paginador.model';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor( private httpCliente: HttpClient) { }

  async registrar( examen: ExamenModel ): Promise<ExamenModel>{
    return await this.httpCliente.post<any>("http://localhost:9094/examenes", examen).toPromise();
  }

  async listar( parametros:any ): Promise<PaginadorModel> {
    const res = await this.httpCliente.post<any>("http://localhost:9094/examenes/paginado", parametros).toPromise();
    return res;
  }

  async editarResultado( examen: ExamenModel ): Promise<ExamenModel>{
    return await this.httpCliente.put<any>("http://localhost:9094/examenes/resultado", examen).toPromise();
  }

  async finalizarExamen( examenId:number ): Promise<ExamenModel>{
    return await this.httpCliente.delete<any>(`http://localhost:9094/examenes/${examenId}`).toPromise();
  }

  async actualizarEstadoCitaGenerada( examenId:number ): Promise<ExamenModel>{
    return await this.httpCliente.get<any>(`http://localhost:9094/examenes/actualizarEstadoCitaGenerada/${examenId}`).toPromise();
  }
}
