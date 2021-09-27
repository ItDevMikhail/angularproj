import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from '@angular/core';
import { SupportVariablesService } from "./support-variables.service";


@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router,
        private variableService: SupportVariablesService) { }

    canActivate() {  
        this.authService.isLogin() 
        console.log(this.variableService.auth)     
        if (this.variableService.auth) {            
            return true;
        } else {
            this.router.navigate(['users/auth'])
            return false;
        }
    }
}