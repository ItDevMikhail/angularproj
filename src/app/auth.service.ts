import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;

  constructor(private http: HttpClient) { }
  authUser(user: any){
    const body = { login: user.login, password: user.password };
    return this.http.post('http://localhost:5000/users/auth', body);
  }
  registerUser(user: any) {
    const body = { login: user.login, email: user.email, password: user.password };
    return this.http.post('http://localhost:5000/users/register', body);
  }
  saveToken(data: any){
    localStorage.setItem('token', data.token);
    this.token = data.token;
  }
  logout(){
    this.token = null;
    localStorage.removeItem('token');
  }
  IsLogin(){
    if(localStorage.getItem('token') !== null){
      return true;
    } else{
      return false
    }
  }
}
