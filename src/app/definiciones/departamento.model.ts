export class DepartamentoModel{
    departamentoId: number;
    nombre: string;

    constructor( departamentoId?:number, nombre?:string ){
        this.departamentoId = departamentoId;
        this.nombre = nombre;
    }
}