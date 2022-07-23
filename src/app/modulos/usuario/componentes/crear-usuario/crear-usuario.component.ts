import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilModel } from 'src/app/definiciones/perfil.model';
import { PersonalMedicoModel } from 'src/app/definiciones/personal-medico.model';
import { UsuarioModel } from 'src/app/definiciones/usuario.model';
import { PerfilService } from 'src/app/servicios/perfil.service';
import { PersonalMedicoService } from 'src/app/servicios/personal-medico.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  cargando: boolean = true;
  mensajeCarga: string = "Cargando datos...";
  hide: boolean = true;

  form: FormGroup;
  perfiles: PerfilModel[] = [];
  personal_medicos: PersonalMedicoModel[] = [];
  usuarioId: number = null;
  usuario: UsuarioModel = null;

  constructor( 
    private usuarioService: UsuarioService,
    private personalMedicoService: PersonalMedicoService,
    private perfilService: PerfilService,
    private fb: FormBuilder,
    private router: Router,
    private activedRouter: ActivatedRoute ) { 

    this.usuarioId = this.activedRouter.snapshot.params.id;
  }

  async ngOnInit(): Promise<void> {
    this.cargando = true;
    this.crearForm();
    if(this.usuarioId){
      this.usuario = await this.usuarioService.buscarPor(this.usuarioId);
    } else {
      this.usuario = new UsuarioModel();
    }
    this.personal_medicos = await this.personalMedicoService.listarTodos();
    this.perfiles = await this.perfilService.listarTodos();
    this.crearForm();
    this.cargando = false;
  }

  crearForm(){
    this.form = this.fb.group({
      usuario: [this.usuario?.username, Validators.required],
      password: ['', !this.usuarioId ? Validators.required : null],
      perfil: [this.usuario?.perfil?.perfilId, Validators.required],
      persona: [this.usuario?.persona?.personaId, Validators.required]
    });
  }

  async registrar() : Promise<void>{

    if(this.form.valid){
      try {
        this.cargando = true;
        this.mensajeCarga = "Guardando usuario...";
        let usuario = new UsuarioModel();

        usuario.username = this.form.get("usuario").value;
        usuario.password = this.form.get("password").value;
        usuario.perfilId = this.form.get("perfil").value;
        usuario.personaId = this.form.get("persona").value;
        usuario.usuarioId = this.usuarioId;

        if( this.usuarioId ){
          const res = await this.usuarioService.actualizar(usuario);
          Swal.fire("Éxito", "Se guardó el usuario correctamente", "success");
        } else {
          const res = await this.usuarioService.registrar(usuario);
          Swal.fire("Éxito", "Se registro el usuario correctamente", "success");
        }
        this.cargando = false;
        this.router.navigate(['/usuario/listar']);
      } catch (error) {
        this.cargando = false;
        if(error.status == 400){
          Swal.fire("Aviso!", error.error, "warning");            
        } else {
          Swal.fire("Error", "Error de sistema", "error");
        }
      }
    }
  }

  getNombreCompleto( pm: PersonalMedicoModel): string{
    if(!pm)
      return "";

    return pm.nombres + ", " + pm.apellidoPaterno + " " + pm.apellidoMaterno;
  }
}
