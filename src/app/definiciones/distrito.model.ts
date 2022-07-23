import { ProvinciaModel } from "./provincia.model";

export class DistritoModel{
    distritoId: number;
    nombre: string;
    provincia:ProvinciaModel;

    constructor( distritoId?:number, nombre?:string ){
        this.distritoId = distritoId;
        this.nombre = nombre;
    }
}