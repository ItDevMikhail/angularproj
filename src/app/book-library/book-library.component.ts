import { Component, Input, OnInit } from '@angular/core';
import { IBook } from '../iBook';
import { BookService } from '../book.service';
import { SupportVariablesService } from '../support-variables.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { pipe } from 'rxjs';




@Component({
  selector: 'app-book-library',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.scss']
})
export class BookLibraryComponent implements OnInit {
  @Input() diameter: number = 50
  search: string = '';
  modelChanged: Subject<string> = new Subject<string>();

  constructor(private bookService: BookService,
    public variableService: SupportVariablesService,
    private authService: AuthService,
    public dialog: MatDialog) {
    this.modelChanged.pipe(
      debounceTime(500), distinctUntilChanged())
      .subscribe((search: string) => { this.search = search; this.bookService.getSearch(this.search) });
  }

  ngOnInit(): void {
    this.getBooks();
    this.bookService.getFavorite();
    this.authService.getUserName();
    this.bookService.getToDashboard();
  }
  getFavorite(book: any): boolean {
    if (this.variableService.Favorite.length) {
      let favor = (this.variableService.Favorite).filter((data: any) => data.bookId == book)
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
    this.bookService.getBooks()
  }

  addFavorite(book: IBook) {
    this.bookService.addFavorite(book)

  }
  changed(text: string) {
    this.modelChanged.next(text);
  }
  searchBook() {
    console.log(this.search)
    this.bookService.getSearch(this.search)
  }

  deleteBook(book: IBook) {
    const dialogRef = this.dialog.open(BookLibraryDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.deleteBook(book).subscribe((data) => { this.getBooks(); this.bookService.getToDashboard() });
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
