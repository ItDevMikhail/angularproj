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
  // disabledButton = false;
  // errorMessage = false;
  // files: any;
  books: IBook = {
    name: '',
    description: ''
  };
  responseBook: IBook | undefined;
  constructor(private bookService: BookService,
    public bookServiceProp: BookService,
    private checkForm: CheckFormService) { }

  add(books: IBook): any {
    let final_data: any;
    if (!this.checkForm.validationCreateBook(books)) {
      return false
    }
    const formData = new FormData();
    formData.append('books', JSON.stringify(books));
    if (this.bookService.files) {
      formData.append('picture', this.bookService.files[0]);
      final_data = formData;
    } else {
      final_data = formData;
    }
    this.bookServiceProp.disabledButton = true
    setTimeout(() => { this.bookServiceProp.disabledButton = false }, 800)

    this.bookService.createBook(final_data)
  }
  addPicture(event: any){
    this.bookService.addPicture(event)
  }
}
