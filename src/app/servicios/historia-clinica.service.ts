import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginadorModel } from '../definiciones/paginador.model';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  constructor(private httpCliente: HttpClient) { }

  async listarPaginado( parametros:any ): Promise<PaginadorModel> {
    const paginador = await this.httpCliente.post<any>("http://localhost:9094/historias-clinicas/paginado", parametros ).toPromise();
    console.log(paginador);
    
    return paginador;
  }
}
