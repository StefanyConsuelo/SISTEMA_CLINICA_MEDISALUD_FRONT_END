export class EspecialidadModel{

    especialidadId: number;
    especialidad: string;

    constructor( especialidadId?:number, especialidad?:string ){
        this.especialidadId = especialidadId;
        this.especialidad = especialidad;
    }
}