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
  success = false;
  constructor(public authService: AuthService,
    private router: Router,
    public variableService: SupportVariablesService) { }

  ngOnInit(): void {
    this.authService.getUserName()?.subscribe((data: any) => { this.variableService.getUserName(data.login) }, (e) => e.message);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['users/auth'])
  }
}