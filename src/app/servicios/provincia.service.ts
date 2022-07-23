import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProvinciaModel } from '../definiciones/provincia.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private httpCliente:HttpClient) { }

  async listarPor( departamentoId:number ): Promise<ProvinciaModel[]> {
    const paginador = await this.httpCliente.get<any>(`http://localhost:9094/provincias/${departamentoId}/departamentos`).toPromise();
    return paginador;
  }
}
