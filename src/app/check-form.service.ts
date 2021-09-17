import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor(private flashMessages: FlashMessagesService) { }

  checkLogin(login: String | undefined){
    if (login == undefined){
      this.flashMessages.show("Логин не введен", {timeout: 2000})
      return false;
    } else{
      return true;
    }
  }
  checkPassword(password: String | undefined){
    if (password == undefined){
      this.flashMessages.show("Пароль не введен", {timeout: 2000})
      return false;
    } else if(password.length < 8){
      this.flashMessages.show("Минимальная длина пароля 8", { timeout: 2000})
      return false;
    } else{
      return true;
    }
  }
  checkEmail(email: String | undefined){
    if (email == undefined){
      this.flashMessages.show("Email не введен", {timeout: 2000})
      return false;
    } else{
      return true;
    }
  }
}
