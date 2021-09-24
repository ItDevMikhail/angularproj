import { Component } from '@angular/core';
import { CheckFormService } from '../check-form.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  disabledButton: boolean = false;
  login?: string;
  email?: string;
  password?: string;
  confirmPass?: string;

  constructor(private checkForm: CheckFormService,
    private authService: AuthService) { }

  userRegister(): void | boolean {
    const user = {
      login: this.login,
      email: this.email,
      password: this.password,
    }
    if (!this.checkForm.validationRegistration(this.login, this.email, this.password, this.confirmPass)) {
      return false;
    }
    
    this.disabledButton = true;    
    this.authService.registerUser(user).add(()=>{ this.disabledButton = false})
  }
}
