import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  name?: string | null;
  constructor() { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
  }


}
