import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor(private messageService: MessageService,) { }

  checkLogin(login: String | undefined){
    if (login == undefined){
      this.messageService.add('Логин не введен')
      return false;
    } else{
      return true;
    }
  }
  checkPassword(password: String | undefined){
    if (password == undefined){
      this.messageService.add('Пароль не введен')
      return false;
    } else if(password.length < 8){
      this.messageService.add('Минимальная длина пароля 8')
      return false;
    } else{
      return true;
    }
  }
  checkEmail(email: String | undefined){
    if (email == undefined){
      this.messageService.add('Email не введен')
      return false;
    } else{
      return true;
    }
  }
}
