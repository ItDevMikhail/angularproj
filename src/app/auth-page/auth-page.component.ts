import { Component} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

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
    private messageService: MessageService) { }
  userLogin(): any {
    const user = {
      login: this.login,
      password: this.password
    }
    if (this.password == undefined) {
      this.messageService.add('Введите пароль')
      return false;
    }
    this.authService.authUser(user)
      .subscribe(
        (data: any) => {
          if (data.login == this.login) {
            this.authService.saveToken(data)
            this.messageService.add('Вы успешно авторизовались', 1000)
            this.router.navigate(['library']);
          } else {
            console.log(data.message);
          }
        }, (error) => {
          if ((error.message).includes('401')) {
            this.messageService.add('Неверный пароль')
          } else if ((error.message).includes('400')) {
            this.messageService.add('Пользователь не найден')
          } else {
            console.log(error.message);
          }
        });
  }
}
