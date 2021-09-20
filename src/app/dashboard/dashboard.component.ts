import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { IBook } from '../iBook';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  name?: string | null;
  books: IBook[] = [];
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.bookService.addToDashboard().subscribe((data: any) => this.books = data);
  }
}
