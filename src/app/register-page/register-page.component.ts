import { Component } from '@angular/core';
import { CheckFormService } from '../check-form.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  disabledButton = false;
  login: String | undefined;
  email: String | undefined;
  password: String | undefined;
  confirmPass: String | undefined;

  constructor(private checkForm: CheckFormService,
    private authService: AuthService) { }

  userRegister(): any {
    const user = {
      login: this.login,
      email: this.email,
      password: this.password,
    }
    if (!this.checkForm.validationRegistration(this.login, this.email, this.password, this.confirmPass)) {
      return false;
    }
    
    this.disabledButton = true;
    setTimeout(() => {
      this.disabledButton = false;
    }, 500)
    
    this.authService.registerUser(user)
  }
}
