import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginadorModel } from '../definiciones/paginador.model';
import { ServicioModel } from '../definiciones/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private httpCliente: HttpClient) { }

  async listarPor( servicioId:number ): Promise<ServicioModel[]> {
    const res = await this.httpCliente.get<any>(`http://localhost:9094/servicios/${servicioId}/areas-medicas`).toPromise();
    return res;
  }

  async listar( parametros:any ): Promise<PaginadorModel> {
    const res = await this.httpCliente.post<any>("http://localhost:9094/servicios/paginado", parametros).toPromise();
    return res;
  }

  async registrar( servicio: ServicioModel ): Promise<ServicioModel>{
    return await this.httpCliente.post<any>("http://localhost:9094/servicios", servicio).toPromise();
  }

  async eliminar( servicioId:number ): Promise<ServicioModel>{
    return await this.httpCliente.delete<any>(`http://localhost:9094/servicios/${servicioId}`).toPromise();
  }
  
  async editar( servicio: ServicioModel ): Promise<ServicioModel>{
    return await this.httpCliente.put<any>("http://localhost:9094/servicios", servicio).toPromise();
  }
}
