import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { IBook } from '../iBook';
import { CheckFormService } from '../check-form.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent {
  books: IBook = {
    name: '',
    description: ''
  };
  responseBook?: IBook;

  constructor(private bookService: BookService,
    public bookServiceProp: BookService,
    private checkForm: CheckFormService) { }

  add(books: IBook): void | boolean {
    let final_data: JSON | FormData;

    if (!this.checkForm.validationCreateBook(books)) {
      return false;
    }
    const formData = new FormData();
    formData.append('books', JSON.stringify(books));
    if (this.bookService.files) {
      formData.append('picture', this.bookService.files[0]);
      final_data = formData;
    } else {
      final_data = formData;
    }
    this.bookServiceProp.disabledButton = true;
    this.bookService.createBook(final_data).add(()=> this.bookServiceProp.disabledButton = false);
  }

  addPicture(event: any){
    this.bookService.addPicture(event)
  }
}
