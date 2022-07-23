import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CamaModel } from '../definiciones/cama.model';

@Injectable({
  providedIn: 'root'
})
export class CamaService {

  constructor(private httpCliente: HttpClient) { }

  async listarTodos(): Promise<CamaModel[]> {
    const res = await this.httpCliente.get<any>("http://localhost:9094/camas").toPromise();
    return res;
  }
}
