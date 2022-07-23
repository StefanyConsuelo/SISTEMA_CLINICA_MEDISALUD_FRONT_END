import { DepartamentoModel } from "./departamento.model";
import { DistritoModel } from "./distrito.model";
import { HistoriaClinicaModel } from "./historia-clinica.model";

export class PacienteModel{
    pacienteId;
    personaId;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    tipoDocumento: string;
    numeroDocumento: string;
    genero: string;
    estadoCivil: string;
    grupoSanguineo: string;
    canal: string;
    religion: string;    
    fechaNacimiento: string;
    lugarNacimiento: string;
    tipoPaciente: string;
    telefonoFijo: string;
    celular: string;
    correo: string;
    distritoId: number;
    direccion: string;
    responsableNombresApellidos: string;
    responsableParentescoPaciente: string;
    responsableTelefono: string;  
    distrito: DistritoModel;
    historiaClinica:HistoriaClinicaModel;
    peso:string;
    talla:string;
}