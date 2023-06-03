import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LogGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { };
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    console.log("Route guard activated: login component can only be accessed while unlogged.");
    
    let isLoggedIn = this.loginService.isLoggedIn;

      if (isLoggedIn) {
    this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
  
}