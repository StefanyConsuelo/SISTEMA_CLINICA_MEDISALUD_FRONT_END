import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaMedicaModel } from '../definiciones/area-medica.model';
import { PaginadorModel } from '../definiciones/paginador.model';

@Injectable({
  providedIn: 'root'
})
export class AreaMedicaService {

  constructor(private httpCliente: HttpClient) { }

  async listarTodos(): Promise<AreaMedicaModel[]> {
    const res = await this.httpCliente.get<any>("http://localhost:9094/areas-medicas").toPromise();
    return res;
  }

  async listar( parametros:any ): Promise<PaginadorModel> {
    const res = await this.httpCliente.post<any>("http://localhost:9094/areas-medicas/paginado", parametros).toPromise();
    return res;
  }

  async registrar( areaModel: AreaMedicaModel ): Promise<AreaMedicaModel>{
    return await this.httpCliente.post<any>("http://localhost:9094/areas-medicas", areaModel).toPromise();
  }

  async eliminar( areaId:number ): Promise<AreaMedicaModel>{
    return await this.httpCliente.delete<any>(`http://localhost:9094/areas-medicas/${areaId}`).toPromise();
  }
  
  async editar( areaModel: AreaMedicaModel ): Promise<AreaMedicaModel>{
    return await this.httpCliente.put<any>("http://localhost:9094/areas-medicas", areaModel).toPromise();
  }

}
