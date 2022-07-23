import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesoModuloGuard } from './guard/acceso-modulo.guard';
import { AuthGuard } from './guard/auth.guard';
import { ValidLoginGuard } from './guard/valid-login.guard';
import { InicioComponent } from './modulos/estructura/inicio/inicio.component';
import { SidebarComponent } from './modulos/estructura/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: "auth",
    canActivate:[ValidLoginGuard],
    loadChildren: () =>
      import("./modulos/authenticacion/authenticacion.module").then(
         (m) => m.AuthenticacionModule )
  },
  { path: "",   
    redirectTo: '/inicio', 
    pathMatch: 'full' 
  },
  {
    path: "",
    component: SidebarComponent,
    canActivate: [AuthGuard],
    canActivateChild: [],
    children: [
      {
        path: "inicio",
        component: InicioComponent,
        pathMatch: 'full'
      },
      {
        path: "personal-medico",
        loadChildren: () =>
          import("./modulos/personal-medico/personal-medico.module").then(
            (m) => m.PersonalMedicoModule
          ),
        canActivate: [AccesoModuloGuard],
        data: { codigoModulo: "PERSONAL_MEDICO" },
      },
      {
        path: "paciente",
        loadChildren: () =>
          import("./modulos/paciente/paciente.module").then(
            (m) => m.PacienteModule
          ),
        canActivate: [AccesoModuloGuard],
        data: { codigoModulo: "PACIENTE" },
      },
      {
        path: "cita-medica",
        loadChildren: () =>
          import("./modulos/cita-medica/cita-medica.module").then(
            (m) => m.CitaMedicaModule
          ),
        canActivate: [AccesoModuloGuard],
        data: { codigoModulo: "CITA_MEDICA" },
      },
      {
        path: "hospitalizacion",
        loadChildren: () =>
          import("./modulos/hospitalizacion/hospitalizacion.module").then(
            (m) => m.HospitalizacionModule
          ),
        canActivate: [AccesoModuloGuard],
        data: { codigoModulo: "HOSPITALIZACION" },
      },
      {
        path: "historia-clinica",
        loadChildren: () =>
          import("./modulos/historia-clinica/historia-clinica.module").then(
            (m) => m.HistoriaClinicaModule
          ),
        canActivate: [AccesoModuloGuard],
        data: { codigoModulo: "HISTORIA_CLINICA" },
      },
      {
        path: "usuario",
        loadChildren: () =>
          import("./modulos/usuario/usuario.module").then(
            (m) => m.UsuarioModule
          ),
        canActivate: [AccesoModuloGuard],
        data: { codigoModulo: "USUARIOS" },
      },
      {
        path: "reporte",
        loadChildren: () =>
          import("./modulos/reportes/reportes.module").then(
            (m) => m.ReportesModule
          ),
        canActivate: [AccesoModuloGuard],
        data: { codigoModulo: "REPORTE" },
      },
      {
        path: "agenda",
        loadChildren: () =>
          import("./modulos/agenda/agenda.module").then(
            (m) => m.AgendaModule
          ),
        canActivate: [AccesoModuloGuard],
        data: { codigoModulo: "AGENDA" },
      },
      {
        path: "mantenimientos",
        loadChildren: () =>
          import("./modulos/mantenimientos/mantenimientos.module").then(
            (m) => m.MantenimientosModule
          ),
        canActivate: [AccesoModuloGuard],
        data: { codigoModulo: "" },
      }
    ]
  },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}