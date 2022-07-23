import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticacionModel } from '../definiciones/authenticacion.model';
import { ModuloModel } from '../definiciones/modulo.model';
import { TokenModel } from '../definiciones/token.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private httpCliente: HttpClient ) { }

  async login( authenticacionModel: AuthenticacionModel ): Promise<any>{
    const res = await this.httpCliente.post<any>("http://localhost:9094/login", authenticacionModel).toPromise();
    return res;
  }

  isAuthenticado(): boolean {
    if( window.localStorage.getItem("TOKEN_SIDET") ){
        return true;
    }
    return false;
  }

  eliminarAuthenticacion(): void{
    window.localStorage.removeItem("TOKEN_SIDET");
    window.location.reload();
  }

  imprimirDataDesdeToken(): void{
    let token = window.localStorage.getItem("TOKEN_SIDET");
    const data = JSON.parse(atob(token.split('.')[1]));
    let modulos = new Array<ModuloModel>();
    modulos = JSON.parse(data.modulos);
  }

  getDataDesdeToken(): TokenModel{
    const token = window.localStorage.getItem("TOKEN_SIDET");
    const data = JSON.parse(atob(token.split('.')[1]));
    let tokenModel = new TokenModel();
    tokenModel = data;
    tokenModel.modulos = JSON.parse(data.modulos);
    return tokenModel;
  }

  getModulosDesdeToken(): ModuloModel[]{
    const token = this.getDataDesdeToken();
    return token.modulos;
  }

  validarPermisoModulo( codigo: string ): boolean{
    let modulos = this.getModulosDesdeToken();
    let index = modulos.findIndex( m => m.codigo === codigo );
    return index == -1 ? false : true;
  }

  validarPermisoRol( permiso: string, codigoModulo: string ): boolean{
    const modulos = this.getModulosDesdeToken();
    const index = modulos.findIndex( m => m.codigo == codigoModulo );
    if(index == -1 )
      return false;
    const indexRol = modulos[index].roles.findIndex( r => r == permiso );
    if(indexRol == -1){
      return false;
    }
    return true;
  }

}
