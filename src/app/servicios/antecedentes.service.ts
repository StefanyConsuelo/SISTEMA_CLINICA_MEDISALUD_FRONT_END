import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AntecedentesModel } from '../definiciones/antecedentes.model';

@Injectable({
  providedIn: 'root'
})
export class AntecedentesService {

  constructor(private httpCliente: HttpClient) { }

  async buscarPor( historiaClinicaId:number ): Promise<AntecedentesModel> {
    const res = await this.httpCliente.get<any>(`http://localhost:9094/antecedentes/${historiaClinicaId}`).toPromise();
    return res;
  }

  async actualizar( antecedentes:AntecedentesModel ): Promise<AntecedentesModel[]> {
    const res = await this.httpCliente.put<any>(`http://localhost:9094/antecedentes`, antecedentes).toPromise();
    return res;
  }
}
