export const BACKGROUND_COLOR_NO_LABORABLE = "background-color: gray";
export const BACKGROUND_COLOR_OCUPADO = "background-color: #FDFD96";
export const BACKGROUND_COLOR_DISPONIBLE = "background-color: #00A86B";
export const BACKGROUND_COLOR_RESERVAR = "background-color: orange";

export const TURNO_MANANA = 1;
export const TURNO_TARDE = 2;
export const TURNO_NOCHE = 3;

export function getNuevosItemsTurnoManana(nombreMedico: string): Array<any>{
    return new Array({
      nombreMedico: nombreMedico,
      tieneCita: false
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "08:00",
      hs: "08:20",
      esLaborable: false, 
      cita: 0
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "08:20",
      hs: "08:40",
      esLaborable: false, 
      cita: 0
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "08:40",
      hs: "09:00",
      esLaborable: false, 
      cita: 0
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "09:00",
      hs: "09:20",
      esLaborable: false, 
      cita: 0
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "09:20",
      hs: "09:40",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "09:40",
      hs: "10:00",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "10:00",
      hs: "10:20",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "10:20",
      hs: "10:40",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "10:40",
      hs: "11:00",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "11:00",
      hs: "11:20",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "11:20",
      hs: "11:40",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "11:40",
      hs: "12:00",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "12:00",
      hs: "12:20",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "12:20",
      hs: "12:40",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "12:40",
      hs: "01:00",
      esLaborable: false, 
      cita: 0
    });
}

export function getNuevosItemsTurnoNoche(nombreMedico: string): Array<any>{
    return new Array({
      nombreMedico: nombreMedico,
      tieneCita: false
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "19:00",
      hs: "19:20",
      esLaborable: false, 
      cita: 0
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "19:20",
      hs: "19:40",
      esLaborable: false, 
      cita: 0
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "19:40",
      hs: "20:00",
      esLaborable: false, 
      cita: 0
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "20:00",
      hs: "20:20",
      esLaborable: false, 
      cita: 0
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "20:20",
      hs: "20:40",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "20:40",
      hs: "21:00",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "21:00",
      hs: "21:20",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "21:20",
      hs: "21:40",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "21:40",
      hs: "22:00",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "22:00",
      hs: "22:20",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "22:20",
      hs: "22:40",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "22:40",
      hs: "23:00",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "23:00",
      hs: "23:20",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "23:20",
      hs: "23:40",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "23:40",
      hs: "00:00",
      esLaborable: false, 
      cita: 0
    });
}

export function getNuevosItemsTurnoTarde(nombreMedico: string): Array<any>{
    return new Array({
      nombreMedico: nombreMedico,
      tieneCita: false
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "14:00",
      hs: "14:20",
      esLaborable: false, 
      cita: 0
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "14:20",
      hs: "14:40",
      esLaborable: false, 
      cita: 0
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "14:40",
      hs: "15:00",
      esLaborable: false, 
      cita: 0
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "15:00",
      hs: "15:20",
      esLaborable: false, 
      cita: 0
    },{
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "15:20",
      hs: "15:40",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "15:40",
      hs: "16:00",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "16:00",
      hs: "16:20",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "16:20",
      hs: "16:40",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "16:40",
      hs: "17:00",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "17:00",
      hs: "17:20",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "17:20",
      hs: "17:40",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "17:40",
      hs: "18:00",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "18:00",
      hs: "18:20",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "18:20",
      hs: "18:40",
      esLaborable: false, 
      cita: 0
    },
    {
      nombrePaciente: "",
      eliminar: false,
      tieneCita: false,
      color: BACKGROUND_COLOR_NO_LABORABLE,
      he: "18:40",
      hs: "19:00",
      esLaborable: false, 
      cita: 0
    });
}

export const TITULOS_HORARIO_MANANA = [
    "Médico",
    "08:00 - 08:20",
    "08:20 - 08:40",
    "08:40 - 09:00",
    "09:00 - 09:20",
    "09:20 - 09:40",
    "09:40 - 10:00",
    "10:00 - 10:20",
    "10:20 - 10:40",
    "10:40 - 11:00",
    "11:00 - 11:20",
    "11:20 - 11:40",
    "11:40 - 12:00",
    "12:00 - 12:20",
    "12:20 - 12:40",
    "12:40 - 01:00"
];

export const TITULOS_HORARIO_NOCHE = [
    "Médico",
    "19:00 - 19:20",
    "19:20 - 19:40",
    "19:40 - 20:00",
    "20:00 - 20:20",
    "20:20 - 20:40",
    "20:40 - 21:00",
    "21:00 - 21:20",
    "21:20 - 21:40",
    "21:40 - 22:00",
    "22:00 - 22:20",
    "22:20 - 22:40",
    "22:40 - 23:00",
    "23:00 - 23:20",
    "23:20 - 23:40",
    "23:40 - 00:00"
]

export const TITULOS_HORARIO_TARDE = [
    "Médico",
    "14:00 - 14:20",
    "14:20 - 14:40",
    "14:40 - 15:00",
    "15:00 - 15:20",
    "15:20 - 15:40",
    "15:40 - 16:00",
    "16:00 - 16:20",
    "16:20 - 16:40",
    "16:40 - 17:00",
    "17:00 - 17:20",
    "17:20 - 17:40",
    "17:40 - 18:00",
    "18:00 - 18:20",
    "18:20 - 18:40",
    "18:40 - 19:00"
]