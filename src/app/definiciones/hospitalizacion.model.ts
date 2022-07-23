import { CamaModel } from "./cama.model";
import { PacienteModel } from "./paciente.model";
import { PersonalMedicoModel } from "./personal-medico.model";

export class HospitalizacionModel{

    hospitalizacionId:number = null;
    fechaRegistro: string = null;
    preDiagnostico: string = null;
    procedencia: string = null;
    observacion: string = null;
    alta: string = null;
    estado: string = null;
    paciente: PacienteModel = null;
    cama: CamaModel = null;
    personalMedico: PersonalMedicoModel = null;
    pacienteId: number;
    personalMedicoId: number;
    camaId:number = null;
}