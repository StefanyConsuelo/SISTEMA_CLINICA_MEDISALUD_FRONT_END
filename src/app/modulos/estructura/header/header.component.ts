import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private loginService: LoginService ) { }

  ngOnInit(): void {
  }

  openSidebar(){
    document.getElementById("_sidebar")?.classList.toggle("active");
    document.getElementById("_content-main")?.classList.toggle("active");
  }

  cerrarSesion(): void {
    this.loginService.eliminarAuthenticacion();
  }
}
