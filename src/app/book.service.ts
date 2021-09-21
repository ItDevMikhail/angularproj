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
  constructor(private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    public variableService: SupportVariablesService) { }
  getBook(id: string) {
    this.variableService.spinner = true;
    return this.http.get(`http://localhost:5000/library/detail/${id}`)
  }
  getBooks() {
    this.variableService.errorMessage = false;
    this.variableService.spinner = true;
    return this.http.get('http://localhost:5000/library')
  }
  createBook(books: any) {
    this.variableService.spinner = true;
    return this.http.post('http://localhost:5000/library/add', books).subscribe(
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
    ).add(()=> this.variableService.spinner = false);
  }
  getFavorite() {
    const token = localStorage.getItem('token');
    return this.http.get(`http://localhost:5000/library/addFavorite/${token}`)
  }
  addFavorite(book: IBook) {
    const token = localStorage.getItem('token');
    const body = { token: token, book: book._id }
    return this.http.post('http://localhost:5000/library/addFavorite', body)
  }
  getToDashboard() {
    this.variableService.errorMessage = false;
    this.variableService.spinner = true;
    const token = localStorage.getItem('token');
    return this.http.get(`http://localhost:5000/library/dashboard/${token}`)
  }
}
