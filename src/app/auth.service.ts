import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ISignInResponse from './iSingInResponse';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null | undefined;
  name: string | null | undefined;

  constructor(private http: HttpClient,
    private messageService: MessageService,
    private router: Router) { }

  authUser(user: any): any {
    const body = { login: user.login, password: user.password };
    return this.http.post('http://localhost:5000/users/auth', body).subscribe(
      (data: any) => {
        if (data.login == user.login) {
          this.saveToken(data)
          this.messageService.add('Вы успешно авторизовались', 1000)
          this.router.navigate(['library']);
        } else {
          console.log(data.message);
        }
      }, (error) => {
        if ((error.message).includes('401')) {
          this.messageService.add('Неверный пароль', 1500)
        } else if ((error.message).includes('400')) {
          this.messageService.add('Пользователь не найден')
        } else {
          console.log(error.message);
        }
      });
  }

  registerUser(user: any): any {
    const body = { login: user.login, email: user.email, password: user.password };
    return this.http.post('http://localhost:5000/users/register', body).subscribe(
      (data: any) => {
        if (data = user.login) {
          this.messageService.add('Пользователь добавлен')
          this.router.navigate(['users/auth']);
        } else {
          this.messageService.add('Пользователь не добавлен')
        }
      }, (error) => {
        if ((error.message).includes('400')) {
          this.messageService.add('Логин занят')
        } else {
          this.messageService.add('404 Bad request')
        }
      }
    );
  }

  saveToken(data: any): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.login);
    this.token = data.token;
    this.name = data.login;
  }

  logout(): void {
    this.token = null;
    this.name = null;
    localStorage.clear();
  }

  IsLogin(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false
    }
  }
}
