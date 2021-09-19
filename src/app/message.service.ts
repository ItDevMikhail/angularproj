import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string = '';
  constructor() { }

  add(message: string, timeout: number = 2000) {
    this.messages = message;
    setTimeout(()=> {this.messages = ''}, timeout)
  }
}
