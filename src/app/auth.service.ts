import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { SupportVariablesService } from './support-variables.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null | undefined;
  authUrl: string = 'http://localhost:5000/users/'

  constructor(private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private variableService: SupportVariablesService) { }

  authUser(user: any): any {
    this.variableService.errorMessage = false;
    this.variableService.spinner = true;
    const body = { login: user.login, password: user.password };
    return this.http.post(this.authUrl + 'auth', body).subscribe(
      (data: any) => {
        if (data.login == user.login) {
          this.variableService.getUserName(data.login)
          this.saveToken(data)
          this.messageService.add('Вы успешно авторизовались', 1000)
          this.router.navigate(['library']);
          setTimeout(() => {
            this.router.navigate(['library']); 
          }, 100);
        } else {
          console.log(data.message);
        }
      }, (error) => {
        if ((error.message).includes('401')) {
          this.messageService.add('Неверный пароль', 1500)
        } else if ((error.message).includes('400')) {
          this.messageService.add('Пользователь не найден')
        } else {
          this.variableService.errorMessage = true;
        }
      }).add(() => { this.variableService.spinner = false });
  }

  registerUser(user: any): any {
    this.variableService.errorMessage = false;
    this.variableService.spinner = true;
    const body = { login: user.login, email: user.email, password: user.password };
    return this.http.post(this.authUrl + 'register', body).subscribe(
      (data: any) => {
        if (data == user.login) {
          this.messageService.add('Пользователь добавлен')
          this.router.navigate(['users/auth']);
        } else {
          this.messageService.add('Пользователь не добавлен')
        }
      }, (error) => {
        if ((error.message).includes('400')) {
          this.messageService.add('Логин занят')
        } else {
          this.variableService.errorMessage = true;
        }
      }
    ).add(() => this.variableService.spinner = false);
  }

  getUserName() {
    const token = localStorage.getItem('token');
    if (token != null) {
      return this.http.get(`${this.authUrl}user/${token}`)
        .subscribe((data: any) => { this.variableService.getUserName(data.login);}, (e) => { e.message });
    } else {
      return
    }
  }

  saveToken(data: any): void {
    localStorage.setItem('token', data.token);
    this.token = data.token;
  }

  logout(): void {
    this.token = null;
    this.variableService.auth = false
    localStorage.clear();
  }

  IsLogin(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false
    }
  }
  isLogin() {
    const token = localStorage.getItem('token');
    if (token != null) {
      return this.http.get(`${this.authUrl}auth/${token}`)
      .subscribe(() => { this.variableService.auth = true;}, 
      () => { this.variableService.auth = false; this.logout()});
    } else {
      return false
    }
  }
}
