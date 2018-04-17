import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class Auth1Guard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.authService.loggedIn()){
      this.router.navigate(['/login'],{ queryParams: { returnUrl: state.url }});
      return false;
    }else {
      return true;
    }
  }
}
