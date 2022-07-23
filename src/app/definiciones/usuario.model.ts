import { PerfilModel } from "./perfil.model";
import { PersonaModel } from "./persona.model";

export class UsuarioModel{
    usuarioId: number = null;
    username: string = null;
    password: string = null;
    enabled: boolean = false;
    persona: PersonaModel = null;
    perfil: PerfilModel = null;
    personaId: number = null;
    perfilId: number = null;
}