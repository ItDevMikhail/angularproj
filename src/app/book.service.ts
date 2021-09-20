import { Injectable } from '@angular/core';
import { IBook } from './iBook';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  favoriteBooks: Array<string> =[];
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
  getFavorite(){
    const login = localStorage.getItem('name');
    return this.http.get(`http://localhost:5000/library/addFavorite/${login}`)
  }
  addFavorite(book: IBook){
    const login = localStorage.getItem('name');
    const lStorage = localStorage.getItem('favoriteBooks')
    if (lStorage != null){
    this.favoriteBooks = JSON.parse(lStorage)
    }
    if (this.favoriteBooks.includes(book.name)){
      this.favoriteBooks = this.favoriteBooks.filter((remove: string) => remove != book.name)
    } else {
      this.favoriteBooks.push(book.name)
    }
    const body = {login: login, books : JSON.stringify(this.favoriteBooks)}
    return this.http.post('http://localhost:5000/library/addFavorite', body)
  }
  addToDashboard(){
    const login = localStorage.getItem('name');
    const body = {login: login}
    return this.http.post('http://localhost:5000/library/dashboard', body)
  }
}
