import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { IBook } from '../iBook';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent{
  disabledButton = false;
  books: IBook = {
    name: '',
    description: ''
  };
  responseBook: IBook | undefined;
  constructor(private bookService: BookService,
    private messageService: MessageService,
    private router: Router) { }

  add(books: IBook): any {
    console.log(books.description)
    if (books.name.length < 2) {
      this.messageService.add('Введите название книги')
      return false;
    }
    if (books.description.length <= 0) {
      this.messageService.add('Напишите описание книги')
      return false;
    }
    if (books.description.length <= 20) {
      this.messageService.add('Короткое описание')
      return false;
    }
    this.disabledButton = true
    this.bookService.addBook(books)
      .subscribe(
        (data: any) => {
          this.messageService.add('Книга добавлена')
          books.name = '',
            books.description = ''
          this.router.navigate([`library/detail/${data._id}`]);
        },
        (error) => {
          if ((error.message).includes('400')) {
            this.messageService.add('Такая книга уже есть')
          } else {
            this.messageService.add('404 Bad request')
          }
        }, () => {
          setTimeout(() => { this.disabledButton = false }, 800)
        }
      );
  }
}
