import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticacionModel } from 'src/app/definiciones/authenticacion.model';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  cargando: boolean = false;
  error: boolean = false;

  constructor( 
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router ) { }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm(){
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  async login(): Promise<void>{
    this.cargando = true;
    let login = new AuthenticacionModel();

    login.username = this.form.get("username").value;
    login.password = this.form.get("password").value;

    try {
      const res = await this.loginService.login(login);
      if(res){
        window.localStorage.setItem("TOKEN_SIDET", res.token);
        this.router.navigate(['/inicio']);
      }
    } catch (error) {
      if(error.status == 403 ){
        this.error = true;
      }
    }
    this.cargando = false;
  }

  cerrar(): void {
    this.error = false;
  }
}