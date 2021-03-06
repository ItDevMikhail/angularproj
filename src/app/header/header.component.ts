import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SupportVariablesService } from '../support-variables.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // success: boolean = false;
  constructor(public authService: AuthService,
    private router: Router,
    public variableService: SupportVariablesService) { }

  ngOnInit(): void {
    this.authService.getUserName();
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['users/auth'])
  }
}