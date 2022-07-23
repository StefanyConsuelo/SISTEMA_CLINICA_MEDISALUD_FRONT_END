import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DistritoModel } from '../definiciones/distrito.model';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  constructor( private httpCliente: HttpClient) { }

  async listarPor( provinciaId:number ): Promise<DistritoModel[]> {
    return await this.httpCliente.get<any>(`http://localhost:9094/distritos/${provinciaId}/provincias`).toPromise();
  }

}
