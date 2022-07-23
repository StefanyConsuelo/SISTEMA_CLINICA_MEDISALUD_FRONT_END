import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicamentoModel } from '../definiciones/medicamento.model';
import { PaginadorModel } from '../definiciones/paginador.model';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  constructor(private httpCliente: HttpClient) { }

  async listarTodos(): Promise<MedicamentoModel[]> {
    const res = await this.httpCliente.get<any>("http://localhost:9094/medicamentos").toPromise();
    return res;
  }

  async listar( parametros:any ): Promise<PaginadorModel> {
    const res = await this.httpCliente.post<any>("http://localhost:9094/medicamentos/paginado", parametros).toPromise();
    return res;
  }

  async registrar( medicamentoModel: MedicamentoModel ): Promise<MedicamentoModel>{
    return await this.httpCliente.post<any>("http://localhost:9094/medicamentos", medicamentoModel).toPromise();
  }

  async eliminar( medicamentoId:number ): Promise<MedicamentoModel>{
    return await this.httpCliente.delete<any>(`http://localhost:9094/medicamentos/${medicamentoId}`).toPromise();
  }
  
  async editar( medicamentoModel: MedicamentoModel ): Promise<MedicamentoModel>{
    return await this.httpCliente.put<any>("http://localhost:9094/medicamentos", medicamentoModel).toPromise();
  }
}
