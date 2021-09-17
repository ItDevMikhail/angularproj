import { Component, OnInit, Input } from '@angular/core';
import { IBook } from '../iBook';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../book.service';

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
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBook();
  }
  
  getBook(): void{
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id)
    .subscribe(book => this.book = book)
  }
  goBack(): void {
    this.location.back();
  }
}
