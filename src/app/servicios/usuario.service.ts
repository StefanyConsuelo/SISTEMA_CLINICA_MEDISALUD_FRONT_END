import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginadorModel } from '../definiciones/paginador.model';
import { UsuarioModel } from '../definiciones/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private httpCliente: HttpClient) { }

  async listarPaginado( parametros:any ): Promise<PaginadorModel> {
    const paginador = await this.httpCliente.post<any>("http://localhost:9094/usuarios/paginado", parametros ).toPromise();
    return paginador;
  }

  async registrar( usuario:UsuarioModel ): Promise<UsuarioModel> {
    const res = await this.httpCliente.post<any>("http://localhost:9094/usuarios", usuario ).toPromise();
    return res;
  }

  async actualizar( usuario:UsuarioModel ): Promise<UsuarioModel> {
    const res = await this.httpCliente.put<any>("http://localhost:9094/usuarios", usuario ).toPromise();
    return res;
  }

  async eliminar( usuarioId:any ): Promise<UsuarioModel> {
    const res = await this.httpCliente.delete<any>(`http://localhost:9094/usuarios/${usuarioId}`).toPromise();
    return res;
  }

  async buscarPor( usuarioId:any ): Promise<UsuarioModel> {
    const res = await this.httpCliente.get<any>(`http://localhost:9094/usuarios/${usuarioId}`).toPromise();
    return res;
  }

  async bloquear( usuarioId:any ): Promise<UsuarioModel> {
    const res = await this.httpCliente.get<any>(`http://localhost:9094/usuarios/${usuarioId}/bloquear`).toPromise();
    return res;
  }
  async desbloquear( usuarioId:any ): Promise<UsuarioModel> {
    const res = await this.httpCliente.get<any>(`http://localhost:9094/usuarios/${usuarioId}/desbloquear`).toPromise();
    return res;
  }
}
