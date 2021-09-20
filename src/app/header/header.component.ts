import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  success = false;
  constructor(public authService: AuthService,
    private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['users/auth'])
  }

  libraryMenu() {
    if ((this.router.url).includes('library/a') || (this.router.url).includes('library/d')) {
      return false
    } else if ((this.router.url).includes('library') || !this.authService.IsLogin()) {
      return true
    } else {
      return false
    }
  }

  nolibraryMenu() {
    if ((this.router.url).includes('library/add') || !this.authService.IsLogin()) {
      return true
    } else {
      return false
    }
  }
  dashboardMenu() {
    if ((this.router.url).includes('dashboard')){
      return true
    } else {
      return false
    }
  }

  registerMenu() {
    if ((this.router.url).includes('register')) {
      return false
    } else {
      return true
    }
  }

  authMenu() {
    if ((this.router.url).includes('auth')) {
      return false
    } else {
      return true
    }
  }
}