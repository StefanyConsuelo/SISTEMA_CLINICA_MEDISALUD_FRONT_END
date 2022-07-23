import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PerfilModel } from '../definiciones/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor( private httpCliente: HttpClient) { }

  async listarTodos(): Promise<PerfilModel[]> {
    const res = await this.httpCliente.get<any>("http://localhost:9094/perfiles").toPromise();
    return res;
  }
}
