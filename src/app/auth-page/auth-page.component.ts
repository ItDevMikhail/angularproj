import { Component} from '@angular/core';
import { AuthService } from '../auth.service';
import { CheckFormService } from '../check-form.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  disabledButton: boolean = false;
  login?: string;
  password?: string;

  constructor(private authService: AuthService,
    private checkForm: CheckFormService) { }

  userLogin(): any {
    const user = {
      login: this.login,
      password: this.password
    }
    if(!this.checkForm.validationAuth(this.login, this.password)){
      return false;
    }    
    this.disabledButton = true;
    
    this.authService.authUser(user).add(()=>{this.disabledButton = false});
  }
}
