import { Component, OnInit } from '@angular/core';
import { IBook } from '../iBook';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-library',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.scss']
})
export class BookLibraryComponent implements OnInit {
  books: IBook[] = [];
  add: Array<string> = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data: any) => this.books = data);
    this.bookService.getFavorite().subscribe((data: any) => { this.add = data.books; localStorage.setItem('favoriteBooks', data.books) });
  }
  addFavorite(book: IBook) {
    this.bookService.addFavorite(book)
      .subscribe((data: any) => {
        this.add = data.books;
        localStorage.setItem('favoriteBooks', data.books)
      }, (e) => e.message)
  }
}
