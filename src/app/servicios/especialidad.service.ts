import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EspecialidadModel } from '../definiciones/especialidad.model';
import { PaginadorModel } from '../definiciones/paginador.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor( private httpCliente: HttpClient) { }

  async listarTodos(): Promise<EspecialidadModel[]>{
    return await this.httpCliente.get<any>("http://localhost:9094/especialidades").toPromise();
  }

  async listarPaginado( parametros:any ): Promise<PaginadorModel> {
    const res = await this.httpCliente.post<any>("http://localhost:9094/especialidades/paginado", parametros ).toPromise();
    return res;
  }

}
