import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookLibraryComponent } from './book-library/book-library.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  { path: 'users/auth', component: AuthPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'users/register', component:  RegisterPageComponent},
  { path: 'library', component: BookLibraryComponent, canActivate: [AuthGuard]},
  { path: 'library/detail/:id', component:  BookDetailComponent, canActivate: [AuthGuard]},
  { path: 'library/add', component:  CreateBookComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
