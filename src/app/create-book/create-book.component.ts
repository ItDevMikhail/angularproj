import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { IBook } from '../iBook';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  disabledButton = false;
  books: IBook = {
    name: '',
    description: ''
  };
  responseBook: IBook | undefined;
  constructor(private bookService: BookService,
    private flashMessages: FlashMessagesService,
    private router: Router) { }

  ngOnInit(): void {
  }
  add(books: IBook): any {
    console.log(books.description)
    if (books.name.length <= 2){
      this.flashMessages.show("Введите название книги", {timeout: 2000})
      return false;
    } 
    if (books.description.length <= 0){
      this.flashMessages.show("Напишите описание книги", {timeout: 2000})
      return false;
    }
    if (books.description.length <= 20){
      this.flashMessages.show("Короткое описание", {timeout: 2000})
      return false;
    }
    this.disabledButton = true
    this.bookService.addBook(books)
      .subscribe(
        (data: any) => {
          this.flashMessages.show("Книга добавлена", {timeout: 1000})
          books.name ='',
          books.description = ''
          setTimeout(() => {
            this.router.navigate([`library/detail/${data._id}`]);
          }, 500)
        },
        (error) => {
          if ((error.message).includes('400')) {
            this.flashMessages.show("Такая книга уже есть", { timeout: 2000 });
          } else  {
            this.flashMessages.show("404 Bad request", { timeout: 2000 });
          } 
        }, ()=>{
          setTimeout(()=>{this.disabledButton = false}, 500)
        }
      );
  }
}
