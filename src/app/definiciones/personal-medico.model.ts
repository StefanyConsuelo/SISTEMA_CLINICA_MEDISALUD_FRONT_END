import { camelCase } from "lodash";
import { ServicioModel } from "./servicio.model";

export class PersonalMedicoModel{

    personalMedicoId = null;
    personaId = null;
    nombres: string = null;
    apellidoPaterno: string = null;
    apellidoMaterno: string = null;
    tipoDocumento: string;
    numeroDocumento: string;
    fechaNacimiento: string;
    telefonoFijo: string;
    celular: string;
    correo: string;
    distritoId: number;
    profesion: string;
    servicioId: number;
    documentoProfesional: string;
    numeroDocumentoProfesional: string;
    estadoLaboral: string;
    servicio: ServicioModel;
    show:boolean = false;
}