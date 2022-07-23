import { HospitalizacionModel } from "./hospitalizacion.model";

export class CamaModel{

    camaId:number = null;
    nombre:string = null;
    estado:string = null;
    hospitalizado: HospitalizacionModel = null;
    color:string = "background-color: rgb(187, 236, 255);";
    colorText: string = "color: #000000 !important;";

    constructor( camaId?:number, nombre?:string, estado?:string ){
        this.camaId = camaId;
        this.nombre = nombre;
        this.estado = estado;
    }
}