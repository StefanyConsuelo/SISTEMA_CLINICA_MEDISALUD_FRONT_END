import { HistoriaClinicaModel } from "./historia-clinica.model";

export class MotivoConsultaModel{
    tipoEnfermedad: string = null;
    sintomasPrincipales: string = null;
    relato: string = null;
    apetito: string = null;
    sedantes: string = null;
    orina: string = null;
    historiaClinica: HistoriaClinicaModel = null;
    historiaClinicaId: number = null;
}