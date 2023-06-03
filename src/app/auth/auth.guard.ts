import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { };
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    console.log('Route guard activated: only logged in users can access this page.');
    
    let isLoggedIn = this.loginService.isLoggedIn;

    if (isLoggedIn){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
