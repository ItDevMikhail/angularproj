import { Component} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  login: String | undefined;
  password: String | undefined;
  constructor(private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService) { }
  userLogin(): any {
    const user = {
      login: this.login,
      password: this.password
    }
    if (this.password == undefined) {
      this.flashMessages.show("Введите пароль", { timeout: 2000 })
      return false;
    }
    this.authService.authUser(user)
      .subscribe(
        (data: any) => {
          if (data.login == this.login) {
            this.authService.saveToken(data)
            this.flashMessages.show("Вы успешно авторизовались", { timeout: 2000 });
            this.router.navigate(['library']);
          } else {
            console.log(data.message);
          }
        }, (error) => {
          if ((error.message).includes('401')) {
            this.flashMessages.show("Неверный пароль", { timeout: 1500 });
          } else if ((error.message).includes('400')) {
            this.flashMessages.show("Пользователь не найден", { timeout: 1500 });
          } else {
            console.log(error.message);
          }
        });
  }
}
