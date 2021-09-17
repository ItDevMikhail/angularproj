import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../check-form.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  disabledButton = false;
  login: String | undefined;
  email: String | undefined;
  password: String | undefined;
  constructor(private checkForm: CheckFormService,
    public flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

  }
  userRegister(): any {
    const user = {
      login: this.login,
      email: this.email,
      password: this.password
    }
    if (!this.checkForm.checkLogin(user.login)) {
      return false;
    } else if (!this.checkForm.checkEmail(user.email)) {
      return false;
    } else if (!this.checkForm.checkPassword(user.password)) {
      return false;
    }
    this.disabledButton = true;
    this.authService.registerUser(user)
      .subscribe(
        (data: any) => {
          if (data = this.login) {
            this.flashMessages.show("Пользователь добавлен", { timeout: 1000 });
            setTimeout(() => {
              this.router.navigate(['auth']);
            }, 1000)
          } else {
            this.flashMessages.show("Пользователь не добавлен", { timeout: 2000 });
          }
        }, (error) => {
          if ((error.message).includes('400')) {
            this.flashMessages.show("Логин занят", { timeout: 2000 });
          } else {
            this.flashMessages.show("404 Bad request", { timeout: 2000 });
          }
        }, () => {
          setTimeout(() => {
            this.disabledButton = false;
          }, 1000)
        }
      );
  }
}
