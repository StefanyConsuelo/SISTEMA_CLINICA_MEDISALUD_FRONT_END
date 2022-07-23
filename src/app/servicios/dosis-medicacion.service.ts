import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DosisMedicacionModel } from '../definiciones/dosis-medicacion.model';

@Injectable({
  providedIn: 'root'
})
export class DosisMedicacionService {

  constructor( private httpCliente: HttpClient ) { }

  async listarSiguienteMedicacion( historiaClinicaId:number ): Promise<DosisMedicacionModel[]> {
    const res = await this.httpCliente.get<any>(`http://localhost:9094/dosis-medicaciones/historias-clinicas/${historiaClinicaId}`).toPromise();
    return res;
  }

  async actualizar( dosisMedicacionId:number ): Promise<void> {
    await this.httpCliente.get<any>(`http://localhost:9094/dosis-medicaciones/${dosisMedicacionId}`).toPromise();
  }

  async alertarDosisPacientes( pacientesIds:number[] ): Promise<number[]> {
    return await this.httpCliente.put<number[]>(`http://localhost:9094/dosis-medicaciones/alerta/dosis`, pacientesIds).toPromise();
  }
}
