import { Injectable } from '@angular/core';
import { IBook } from './iBook';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }
  getBook(id: string) {
    return this.http.get(`http://localhost:5000/library/detail/${id}`)
  }
  getBooks() {
    return this.http.get('http://localhost:5000/library')
  }
  addBook(books: IBook) {
    const body = { name: books.name, description: books.description };
    return this.http.post('http://localhost:5000/library/add', body);
  }
  addFavorite(book: IBook){
    const login = localStorage.getItem('name');
    const body = {name: book.name, description: book.description, login: login}
    return this.http.post('http://localhost:5000/library/addFavorite', body)
  }
}
