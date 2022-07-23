import { HistoriaClinicaModel } from "./historia-clinica.model";
import { PersonalMedicoModel } from "./personal-medico.model";
import { ServicioModel } from "./servicio.model";

export class ExamenModel{
    examenId:number;
    servicio:ServicioModel;
    historiaClinica:HistoriaClinicaModel;
    resultado:string;
    estado:string;
    personalMedico:PersonalMedicoModel;
    codigo:string;
    fechaCreacion:string;
}