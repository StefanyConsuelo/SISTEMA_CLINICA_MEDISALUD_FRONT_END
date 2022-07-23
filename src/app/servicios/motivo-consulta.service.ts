import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MotivoConsultaModel } from '../definiciones/motivo-consulta.model';
import { PaginadorModel } from '../definiciones/paginador.model';

@Injectable({
  providedIn: 'root'
})
export class MotivoConsultaService {

  constructor(private httpCliente: HttpClient) { }

  async listar( parametros:any ): Promise<PaginadorModel> {
    const paginador = await this.httpCliente.post<any>("http://localhost:9094/motivos-consultas/paginado", parametros ).toPromise();
    return paginador;
  }

  async registrar( motivoConsultaModel: MotivoConsultaModel ): Promise<MotivoConsultaModel>{
    return await this.httpCliente.post<any>("http://localhost:9094/motivos-consultas", motivoConsultaModel).toPromise();
  }
}
