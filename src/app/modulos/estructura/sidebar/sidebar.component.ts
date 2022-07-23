import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  nombreUsuario: string = "";
  nombrePerfil: string = "";

  constructor(
    private authService: LoginService
  ) { 
    const token = authService.getDataDesdeToken();
    this.nombrePerfil = token.nombrePerfil;
    this.nombreUsuario = token.nombres + ' ' + token.apellidoPaterno + ' ' + token.apellidoMaterno;
  }

  ngOnInit(): void {
    Array.from(document.getElementsByClassName("_tab-menu-label")).forEach(
      (element, index ) => {
        element.addEventListener("click", ()=> {
          document.getElementById("_tab-content-label-"+index)?.classList.toggle("active");
          document.getElementById("_menu-label-icon-"+index)?.classList.toggle("active");

        })
      }
    );
  }

  tienePermisoModulo( codigo: string ): boolean{
    const tienePermiso = this.authService.validarPermisoModulo(codigo);
    return tienePermiso;
  }
}
