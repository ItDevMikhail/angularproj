import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ISignInResponse from './iSingInResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;

  constructor(private http: HttpClient) { }
  authUser(user: any): Observable<ISignInResponse> {
    const body = { login: user.login, password: user.password };
    return this.http.post<ISignInResponse>('http://localhost:5000/users/auth', body);
  }
  registerUser(user: any): Observable<ISignInResponse> {
    const body = { login: user.login, email: user.email, password: user.password };
    return this.http.post<ISignInResponse>('http://localhost:5000/users/register', body);
  }
  saveToken(data: any): void {
    localStorage.setItem('token', data.token);
    this.token = data.token;
  }
  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
  IsLogin(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false
    }
  }
}
