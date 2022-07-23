import { MedicacionModel } from "./medicacion.model";
import { MedicamentoModel } from "./medicamento.model";

export class DetalleMedicacionModel{

    detalleMedicacionId: number = null;
    frecuencia: number = null;
    dosis: string = null;
    via: string = null;
    duracion: number = null;
    siguienteDosis: number = null;
    indicaciones: string = null;
    medicacion: MedicacionModel = null;
    medicamento: MedicamentoModel = null;
    medicamentoId: number = null;
}