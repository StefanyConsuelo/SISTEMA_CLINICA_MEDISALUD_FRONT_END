import { PacienteModel } from "./paciente.model";
import { PersonalMedicoModel } from "./personal-medico.model";

export class CitaMedicaModel{

    citaMedicaId:number = null;
    personalMedico:PersonalMedicoModel = null;
    horaCita:string = null;
    paciente:PacienteModel = null;
    transferido:boolean = false;
    servicioId:number = null;
    fechaCita:string = null;
    pacienteId:number = null;
    personalMedicoId:number = null;
    numeroCitaMedica:string = null;
    areaMedicaId:number = null;
    solicitudExamen:boolean = false;
}