import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarAgendaComponent } from './listar-agenda/listar-agenda.component';
import { AgendaRouting } from './agenda.routing';
import { AngularMaterialModule } from 'src/app/compartido/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListarAgendaComponent
  ],
  imports: [
    CommonModule,
    AgendaRouting,
    AngularMaterialModule,
    FormsModule
  ]
})
export class AgendaModule { }
