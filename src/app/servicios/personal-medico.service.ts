import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HorarioMedicoModel } from '../definiciones/horario-medico.model';
import { PaginadorModel } from '../definiciones/paginador.model';
import { PersonalMedicoModel } from '../definiciones/personal-medico.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalMedicoService {

  constructor( private httpCliente: HttpClient ) { }

  async listar( parametros:any ): Promise<PaginadorModel> {
    const paginador = await this.httpCliente.post<any>("http://localhost:9094/personal-medico/paginado", parametros ).toPromise();
    return paginador;
  }

  async registrar( personalMedico: PersonalMedicoModel ): Promise<PersonalMedicoModel>{
    return await this.httpCliente.post<any>("http://localhost:9094/personal-medico", personalMedico).toPromise();
  }

  async editar( personalMedico: PersonalMedicoModel ): Promise<PersonalMedicoModel>{
    return await this.httpCliente.put<any>("http://localhost:9094/personal-medico", personalMedico).toPromise();
  }
  async buscarPorId( personalMedicoId:number ): Promise<PersonalMedicoModel>{
    return await this.httpCliente.get<any>(`http://localhost:9094/personal-medico/${personalMedicoId}`).toPromise();
  }
  async eliminar( personalMedicoId:number ): Promise<PersonalMedicoModel>{
    return await this.httpCliente.delete<any>(`http://localhost:9094/personal-medico/${personalMedicoId}`).toPromise();
  }
  async consultarConfiguracionHorario( personalMedicoId:number ): Promise<HorarioMedicoModel>{
    return await this.httpCliente.get<any>(`http://localhost:9094/horario-medicos/${personalMedicoId}`).toPromise();
  }
  async configurarHorario( horarioMedico: HorarioMedicoModel ): Promise<HorarioMedicoModel>{
    return await this.httpCliente.put<any>("http://localhost:9094/horario-medicos", horarioMedico).toPromise();
  }
  async listarHorarioMedicoPor( servicioId:number ): Promise<HorarioMedicoModel[]>{
    return await this.httpCliente.get<any>(`http://localhost:9094/horario-medicos/${servicioId}/servicios`).toPromise();
  }
  async listarTodos(): Promise<PersonalMedicoModel[]>{
    return await this.httpCliente.get<any>(`http://localhost:9094/personal-medico`).toPromise();
  }
}
