import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleMedicacionModel } from '../definiciones/detalle-medicacion.model';
import { MedicacionModel } from '../definiciones/medicacion.model';
import { PaginadorModel } from '../definiciones/paginador.model';

@Injectable({
  providedIn: 'root'
})
export class MedicacionService {

  constructor( private httpCliente: HttpClient ) { }

  async registrar( medicacionModel:MedicacionModel): Promise<MedicacionModel> {
    const res = await this.httpCliente.post<any>("http://localhost:9094/medicaciones", medicacionModel).toPromise();
    return res;
  }

  async listarPaginado( parametros:any): Promise<PaginadorModel> {
    const res = await this.httpCliente.post<any>("http://localhost:9094/medicaciones/paginado", parametros).toPromise();
    return res;
  }

  async listarUltimaMedicacion( historiaClinicaId:number ): Promise<DetalleMedicacionModel[]> {
    const res = await this.httpCliente.get<any>(`http://localhost:9094/medicaciones/historias-clinicas/${historiaClinicaId}`).toPromise();
    return res;
  }

}
