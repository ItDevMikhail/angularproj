import { Component, Input, OnInit } from '@angular/core';
import { IBook } from '../iBook';
import { BookService } from '../book.service';
import { SupportVariablesService } from '../support-variables.service';
import { AuthService } from '../auth.service';
// import { interval } from 'rxjs';

@Component({
  selector: 'app-book-library',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.scss']
})
export class BookLibraryComponent implements OnInit {
  @Input() diameter: number = 50
  books: IBook[] = [];
  favorite: IBook[] = [];

  constructor(private bookService: BookService,
    public variableService: SupportVariablesService,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data: any) => { this.books = data }, (e) => { if((e.message).includes('400')) { e.message } else { this.variableService.errorMessage = true; } }).add(() => this.variableService.spinner = false);
    this.bookService.getFavorite().subscribe((data: any) => { this.variableService.varFavorite(data.books) }, (e) => { e.message }).add(() => this.variableService.spinner = false);
    this.authService.getUserName()?.subscribe((data: any) => { this.variableService.getUserName(data.login) }, (e) => { e.message });
    this.bookService.getToDashboard().subscribe((data: any) => { this.favorite = data }, (e) => { e.message }).add(() => this.variableService.spinner = false);
  }
  addFavorite(book: IBook) {
    this.bookService.addFavorite(book)
      .subscribe((data: any) => {
        this.variableService.varFavorite(data.books);
        this.bookService.getToDashboard().subscribe((data: any) => { this.favorite = data }, e => e.message).add(() => this.variableService.spinner = false);
      }, (e) => e.message).add(() => this.variableService.spinner = false);
  }
}
