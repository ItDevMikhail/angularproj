import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { SupportVariablesService } from '../support-variables.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private bookService: BookService,
    public variableService: SupportVariablesService) { }

  ngOnInit(): void {
    this.bookService.getToDashboard()
  }
}
