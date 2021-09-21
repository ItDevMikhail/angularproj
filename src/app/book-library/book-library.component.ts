import { Component, OnInit } from '@angular/core';
import { IBook } from '../iBook';
import { BookService } from '../book.service';
import { SupportVariablesService } from '../support-variables.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-book-library',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.scss']
})
export class BookLibraryComponent implements OnInit {
  books: IBook[] = [];
  // add: Array<string> = [];

  constructor(private bookService: BookService,
    public variableService: SupportVariablesService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data: any) => this.books = data);
    this.bookService.getFavorite().subscribe((data: any) => { this.variableService.varFavorite(data.books)}, (e) => e.message);
    this.authService.getUserName()?.subscribe((data: any) => { this.variableService.getUserName(data.login)}, (e) => e.message);
  }
  addFavorite(book: IBook) {
    this.bookService.addFavorite(book)
      .subscribe((data: any) => {
        this.variableService.varFavorite(data.books);
      }, (e) => e.message)
  }
}
