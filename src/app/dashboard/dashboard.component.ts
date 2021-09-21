import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { IBook } from '../iBook';
import { SupportVariablesService } from '../support-variables.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  books: IBook[] = [];
  constructor(private bookService: BookService,
    public variableService: SupportVariablesService) { }

  ngOnInit(): void {
    this.bookService.getToDashboard().subscribe((data: any) => { this.books = data }, (e) => { if (e.message) { e.message } else { this.variableService.errorMessage = true; } }).add(() => this.variableService.spinner = false);
  }
}
