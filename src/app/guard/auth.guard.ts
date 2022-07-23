import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../servicios/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private auth: LoginService){}

  async canActivate(): Promise<boolean> {
    if( !this.auth.isAuthenticado() ){
      await this.router.navigate(['/auth/login']);
      return false;
    }
    this.auth.imprimirDataDesdeToken();
    return true;
  }
  
}
