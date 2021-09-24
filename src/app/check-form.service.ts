import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {
  validationEmail = /.+\@.+\..+/;

  constructor(private messageService: MessageService,) { }

  validationRegistration(login?: string, email?: string, password?: string, confirmPassword?: string) {
    if (login == undefined || login == '') {
      this.messageService.add('Введите логин')
      return false;
    } else if (password == undefined || password == '') {
      this.messageService.add('Введите пароль')
      return false;
    } else if (password.length < 8) {
      this.messageService.add('Минимальная длина пароля 8')
      return false;
    } else if (email == undefined || email == '') {
      this.messageService.add('Введите email')
      return false;
    } else if (email?.search(this.validationEmail)) {
      this.messageService.add('Некорректный email')
      return false;
    } else if (confirmPassword == undefined || confirmPassword == '') {
      this.messageService.add('Подтвердите пароль')
      return false;
    } else if ((confirmPassword as string).includes((password as string)) && confirmPassword?.length == password?.length) {
      return true
    } else {
      this.messageService.add('Пароли не совпадают')
      return false;
    }
  }
  validationAuth(login?: string, password?: string){
    if (login == undefined || login == ''){
      this.messageService.add('Введите логин')
      return false;
    } else if (password == undefined || password == '') {
      this.messageService.add('Введите пароль')
      return false;
    } else{
      return true;
    }
  }
  validationCreateBook(book: any){
    if (book.name.length < 2) {
      this.messageService.add('Введите название книги')
      return false;
    } else if (book.description.length <= 0) {
      this.messageService.add('Напишите описание книги')
      return false;
    } else if (book.description.length <= 20) {
      this.messageService.add('Короткое описание')
      return false;
    } else {
      return true;
    }
  }
}
