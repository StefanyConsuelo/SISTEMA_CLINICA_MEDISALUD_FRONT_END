import { DepartamentoModel } from "./departamento.model";

export class ProvinciaModel{
    provinciaId: number;
    nombre: string;
    departamento:DepartamentoModel;

    constructor( provinciaId?:number, nombre?:string ){
        this.provinciaId = provinciaId;
        this.nombre = nombre;
    }
}