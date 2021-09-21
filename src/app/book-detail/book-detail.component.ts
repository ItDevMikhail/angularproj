import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { SupportVariablesService } from '../support-variables.service';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  @Input() book?: any;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    public variableService: SupportVariablesService
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    this.variableService.errorMessage = false
    this.variableService.spinner = true;
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id)
      .subscribe(book => this.book = book, (e) => { if (e.message) { e.message } else { this.variableService.errorMessage = true; } }).add(() => this.variableService.spinner = false);
  }
}
