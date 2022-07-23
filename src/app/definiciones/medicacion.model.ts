import { DetalleMedicacionModel } from "./detalle-medicacion.model";
import { PersonalMedicoModel } from "./personal-medico.model";

export class MedicacionModel{
    medicacionId: number = null;
    fechaRegistro: string = null;
    estado: string = null;    
    detalleMedicacion: DetalleMedicacionModel[] = null;
    historiaClinicaId: number = null;
    personaId: number = null;
    personalMedico: PersonalMedicoModel = null;
}