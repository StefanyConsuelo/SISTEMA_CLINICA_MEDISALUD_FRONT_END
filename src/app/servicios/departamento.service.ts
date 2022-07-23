import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartamentoModel } from '../definiciones/departamento.model';
import { ProvinciaModel } from '../definiciones/provincia.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private httpCliente: HttpClient) { }

  async listarTodos(): Promise<DepartamentoModel[]> {
    const paginador = await this.httpCliente.get<any>("http://localhost:9094/departamentos").toPromise();
    return paginador;
  }

}
