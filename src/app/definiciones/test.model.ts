export class TestModel {
    id: number;
    campoTexto: string;
    campoSelect: string;

    constructor( id?:number , campoTexto?:string, campoSelect?:string){
        this.id = id;
        this.campoTexto = campoTexto;
        this.campoSelect = campoSelect;
    }
}