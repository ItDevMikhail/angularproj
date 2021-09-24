import { Injectable } from '@angular/core';
import { IBook } from './iBook';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { SupportVariablesService } from './support-variables.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  disabledButton?: boolean = false;
  errorMessage?: boolean;
  files?: any;
  libraryUrl: string = 'http://localhost:5000/library'

  constructor(private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    public variableService: SupportVariablesService) { }

  getBook(id: string) {
    this.variableService.spinner = true;
    return this.http.get(`${this.libraryUrl}/detail/${id}`)
  }

  getBooks() {
    this.variableService.errorMessage = false;
    this.variableService.spinner = true;
    return this.http.get(this.libraryUrl)
      .subscribe((data: any) => { this.variableService.books = data },
        (e) => {
          if ((e.message).includes('404')) {
            console.log('Книг нет'); this.variableService.books = []
          } else { this.variableService.errorMessage = true; }
        })
      .add(() => this.variableService.spinner = false);
  }

  getSearch(search: string) {
    if ((search.trim()).length < 1) {
      return this.getBooks()
    }
    this.variableService.errorMessage = false;
    this.variableService.spinner = true;
    return this.http.get(`${this.libraryUrl}/search/${search}`)
      .subscribe((data: any) => { this.variableService.books = data })
      .add(() => { this.variableService.spinner = false; })
  }

  createBook(books: any) {
    this.variableService.spinner = true;
    const r = this.http.post(this.libraryUrl + '/add', books);
    return r.subscribe(
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
          this.variableService.errorMessage = true;
          setTimeout(() => { this.variableService.errorMessage = false }, 5000);
        }
      }
    ).add(() => { this.variableService.spinner = false; this.files = undefined; });
  }

  getFavorite() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.libraryUrl}/addFavorite/${token}`)
      .subscribe((data: any) => { this.variableService.Favorite = data }, (e) => { e.message })
      .add(() => this.variableService.spinner = false);
  }

  addFavorite(book: IBook) {
    const token = localStorage.getItem('token');
    const body = { token: token, bookId: book._id }
    return this.http.post(this.libraryUrl + '/addFavorite', body)
      .subscribe((data: any) => { data }, (e) => e.message)
      .add(() => { this.variableService.spinner = false; this.getFavorite(); this.getToDashboard() });
  }

  getToDashboard() {
    this.variableService.errorMessage = false;
    this.variableService.spinner = true;
    const token = localStorage.getItem('token');
    return this.http.get(`${this.libraryUrl}/dashboard/${token}`)
      .subscribe((data: any) => { this.variableService.favorite = data; },
        (e) => { if ((e.message).includes('404')) { this.variableService.favorite = [] } else { this.variableService.errorMessage = true; } })
      .add(() => this.variableService.spinner = false);
  }

  deleteBook(book: IBook) {
    const body = { id: book._id }
    return this.http.delete(this.libraryUrl, ({ body: body }))
  }

  addPicture(event: any) {
    let target = event.target || event.srcElement;
    console.log(target.files);
    if (target.files.length > 0) {
      if ((target.files[0].type).includes('image')) {
        this.files = target.files;
        this.disabledButton = false;
        this.errorMessage = false;
      } else {
        console.log('проверьте формат файла');
        this.disabledButton = true;
        this.errorMessage = true;
      }
    } else {
      this.disabledButton = false;
      this.errorMessage = false;
    }
  }

}
