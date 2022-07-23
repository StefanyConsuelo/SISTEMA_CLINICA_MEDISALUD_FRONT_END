import { DetalleMedicacionModel } from "./detalle-medicacion.model";

export class DosisMedicacionModel{
    dosisMedicacionId: number = null;
    fechaDosis: string = null;
    horaDosis: string = null;
    numeroDosis: number = null;
    estado: string = null;
    detalleMedicacion: DetalleMedicacionModel = null;
    realizado: boolean = false;
}