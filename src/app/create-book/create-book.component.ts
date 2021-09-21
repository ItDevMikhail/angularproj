import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { IBook } from '../iBook';
import { CheckFormService } from '../check-form.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent {
  disabledButton = false;
  files: any;
  books: IBook = {
    name: '',
    description: ''
  };
  responseBook: IBook | undefined;
  constructor(private bookService: BookService,
    private checkForm: CheckFormService) { }

  add(books: IBook): any {
    let final_data: any;
    if (!this.checkForm.validationCreateBook(books)) {
      return false
    }
    
    if (this.files) {
      const formData = new FormData();
      formData.append('picture', this.files[0]);
      formData.append('books', JSON.stringify(books));
      final_data = formData;
    } else {
      final_data = books;
    }

    this.disabledButton = true
    setTimeout(() => { this.disabledButton = false }, 800)

    this.bookService.createBook(final_data)
  }

  addPicture(event: any) {
    let target = event.target || event.srcElement;
    this.files = target.files;
  }
}
