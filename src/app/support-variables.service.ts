import { Injectable } from '@angular/core';
import { IBook } from './iBook';

@Injectable({
  providedIn: 'root'
})
export class SupportVariablesService {
  favorite: IBook[] = [];
  userName?: string;
  spinner?: boolean;
  errorMessage?: boolean;
  Favorite: any;
  books: IBook[] = [];
  
  constructor() { }

  getUserName(login: string = 'userName'){
    this.userName = login
  }
  varFavorite(message: any) {
    this.favorite = message;
  }
}
