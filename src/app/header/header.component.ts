import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  success = false;
  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout();

    this.router.navigate(['users/auth'])
  }
  libraryMenu() {
    if ((this.router.url).includes('library/a')) {
      return false
    } else if ((this.router.url).includes('library') || ((this.router.url).includes('home') && this.authService.IsLogin())){
      return true
    } else {
      return false
    }
  }
  nolibraryMenu() {
    if ((this.router.url).includes('library/add') || (this.router.url).includes('library/detail') || ((this.router.url).includes('home') && this.authService.IsLogin())) {
      return true
    } else {
      return false
    }
  }
  registerMenu(){
    if ((this.router.url).includes('register')){
      return false
    } else {
      return true
    }
  }
  authMenu(){
    if ((this.router.url).includes('auth')){
      return false
    } else {
      return true
    }
  }
}