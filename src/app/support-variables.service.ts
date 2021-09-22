import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupportVariablesService {
  favorite: Array<string> = [];
  userName?: string;
  spinner?: boolean;
  errorMessage?: boolean;
  
  constructor() { }

  getUserName(login: string = 'userName'){
    this.userName = login
  }
  varFavorite(message: Array<string>) {
    this.favorite = message;
  }
}
