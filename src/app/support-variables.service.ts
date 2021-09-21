import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupportVariablesService {
  favorite: Array<string> = [];
  userName: string = '';
  
  constructor() { }

  getUserName(login: string){
    this.userName = login
  }
  varFavorite(message: Array<string>) {
    this.favorite = message;
  }
}
