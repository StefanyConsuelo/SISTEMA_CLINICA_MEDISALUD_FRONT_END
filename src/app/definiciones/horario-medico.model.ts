import { CitaMedicaModel } from "./cita-medica.model";
import { ItemHoraModel } from "./item-hora.model";
import { PersonalMedicoModel } from "./personal-medico.model";

export class HorarioMedicoModel{
    horarioMedicoId: number;
    personalMedico: PersonalMedicoModel;
    personalMedicoId: number;
    tmLunes: string = "-";
    tmMartes: string = "-";
    tmMiercoles: string = "-";
    tmJueves: string = "-";
    tmViernes: string = "-";
    tmSabado: string = "-";
    tmDomingo: string = "-";
    ttLunes: string = "-";
    ttMartes: string = "-";
    ttMiercoles: string = "-";
    ttJueves: string = "-";
    ttViernes: string = "-";
    ttSabado: string = "-";
    ttDomingo: string = "-";
    tnLunes: string = "-";
    tnMartes: string = "-";
    tnMiercoles: string = "-";
    tnJueves: string = "-";
    tnViernes: string = "-";
    tnSabado: string = "-";
    tnDomingo: string = "-";
    items: ItemHoraModel[] = [];
    citas: CitaMedicaModel[] = new Array();
}