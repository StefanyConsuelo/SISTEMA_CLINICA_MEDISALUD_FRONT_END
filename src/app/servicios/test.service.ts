import { Injectable } from '@angular/core';
import { PaginadorModel } from '../definiciones/paginador.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }

  listar( parametros:any ): Promise<PaginadorModel>{
    return null;
  }
}
