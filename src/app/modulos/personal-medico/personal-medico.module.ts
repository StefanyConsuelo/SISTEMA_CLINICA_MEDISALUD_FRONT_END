import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarPersonalMedicoComponent } from './componentes/listar-personal-medico/listar-personal-medico.component';
import { CrearPersonalMedicoComponent } from './componentes/crear-personal-medico/crear-personal-medico.component';
import { PersonalMedicoRouting } from './persona-medico.routing';
import { AngularMaterialModule } from 'src/app/compartido/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ConfigurarHorarioPersonalMedicoComponent } from './componentes/configurar-horario-personal-medico/configurar-horario-personal-medico.component';

@NgModule({
  declarations: [
    ListarPersonalMedicoComponent,
    CrearPersonalMedicoComponent,
    ConfigurarHorarioPersonalMedicoComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PersonalMedicoRouting,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class PersonalMedicoModule { }
