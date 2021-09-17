import {CanActivate, Router} from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from '@angular/core';


@Injectable()

export class AuthGuard implements CanActivate{
    
    constructor(private authService: AuthService,
        private router: Router){}

    canActivate(){
         if(this.authService.IsLogin()){
             return true;
         } else{
             this.router.navigate(['users/auth'])
             return false;
         }
    }
}