import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticacionRouting } from './authenticacion.routing';
import { LoginComponent } from './componentes/login/login.component';
import { AngularMaterialModule } from 'src/app/compartido/angular-material/angular-material.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticacionRouting,
    AngularMaterialModule
  ]
})
export class AuthenticacionModule { }
