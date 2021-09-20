import { Injectable } from '@angular/core';
import { IBook } from './iBook';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  favoriteBooks: Array<string> = [];
  constructor(private http: HttpClient,
    private messageService: MessageService,
    private router: Router) { }
  getBook(id: string) {
    return this.http.get(`http://localhost:5000/library/detail/${id}`)
  }
  getBooks() {
    return this.http.get('http://localhost:5000/library')
  }
  addBook(books: any) {
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
          this.messageService.add('404 Bad request')
        }
      }
    );
  }
  getFavorite() {
    const login = localStorage.getItem('name');
    return this.http.get(`http://localhost:5000/library/addFavorite/${login}`)
  }
  addFavorite(book: IBook) {
    const token = localStorage.getItem('token');
    const lStorage = localStorage.getItem('favoriteBooks')
    if (lStorage != null) {
      this.favoriteBooks = JSON.parse(lStorage)
    }
    const id = book._id as unknown as string
    if (this.favoriteBooks.includes(id)) {
      this.favoriteBooks = this.favoriteBooks.filter((remove: string) => remove != id)
    } else {
      this.favoriteBooks.push(id)
    }
    const body = { token: token, books: JSON.stringify(this.favoriteBooks) }
    return this.http.post('http://localhost:5000/library/addFavorite', body)
  }
  addToDashboard() {
    const login = localStorage.getItem('name');
    const body = { login: login }
    return this.http.post('http://localhost:5000/library/dashboard', body)
  }
}
