import { Component } from '@angular/core';
import { CheckFormService } from '../check-form.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

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
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router) { }

  userRegister(): any {
    const user = {
      login: this.login,
      email: this.email,
      password: this.password,
    }
    if (!this.checkForm.checkLogin(user.login)) {
      return false;
    } else if (!this.checkForm.checkEmail(user.email)) {
      return false;
    } else if (!this.checkForm.checkPassword(user.password)) {
      return false;
    }
    if ((this.confirmPass as string).includes((user.password as string)) && this.confirmPass?.length == user.password?.length) {
    } else {
      this.messageService.add('Пароли не совпадают')
      return false;
    }
    this.disabledButton = true;
    this.authService.registerUser(user)
      .subscribe(
        (data: any) => {
          if (data = this.login) {
            this.messageService.add('Пользователь добавлен')
            this.router.navigate(['users/auth']);
          } else {
            this.messageService.add('Пользователь не добавлен')
          }
        }, (error) => {
          if ((error.message).includes('400')) {
            setTimeout(() => {
              this.disabledButton = false;
            }, 700)
            this.messageService.add('Логин занят')
          } else {
            this.messageService.add('404 Bad request')
          }
        }, () => {
          setTimeout(() => {
            this.disabledButton = false;
          }, 1000)
        }
      );
  }
}
