import { Component, Input, OnInit } from '@angular/core';
import { IBook } from '../iBook';
import { BookService } from '../book.service';
import { SupportVariablesService } from '../support-variables.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-library',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.scss']
})
export class BookLibraryComponent implements OnInit {
  @Input() diameter: number = 50
  books: IBook[] = [];

  constructor(private bookService: BookService,
    public variableService: SupportVariablesService,
    private authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBooks();
    this.bookService.getFavorite();
    this.authService.getUserName()?.subscribe((data: any) => { this.variableService.getUserName(data.login) }, (e) => { e.message });
    this.bookService.getToDashboard()
  }
  getFavorite(book: any): boolean {
    if (this.variableService.Favorite.length) {
      let favor = (this.variableService.Favorite).filter((data: any) => data._id == book)
      if (favor.length > 0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
  getBooks() {
    this.bookService.getBooks().subscribe((data: any) => { this.books = data }, (e) => { if ((e.message).includes('404')) { console.log('Книг нет') } else { this.variableService.errorMessage = true; } }).add(() => this.variableService.spinner = false);
  }

  addFavorite(book: IBook) {
    this.bookService.addFavorite(book)
      .subscribe((data: any) => {
        
      }, (e) => e.message).add(() => { this.variableService.spinner = false; this.bookService.getFavorite(); this.bookService.getToDashboard()});

  }

  deleteBook(book: IBook) {
    const dialogRef = this.dialog.open(BookLibraryDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.deleteBook(book).subscribe(() => { this.getBooks() });
      } else {
        return
      }
    });
  }
}

@Component({
  selector: 'book-library-dialog',
  templateUrl: 'book-library-dialog.html',
})
export class BookLibraryDialog { }