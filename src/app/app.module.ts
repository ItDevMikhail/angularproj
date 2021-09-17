import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BookLibraryComponent } from './book-library/book-library.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CreateBookComponent } from './create-book/create-book.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { BookService } from './book.service';
import { AuthService } from './auth.service';
import { CheckFormService } from './check-form.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    BookLibraryComponent,
    BookDetailComponent,
    AuthPageComponent,
    CreateBookComponent,
    RegisterPageComponent,
    HomePageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FlashMessagesModule.forRoot()

  ],
  providers: [BookService, AuthService, CheckFormService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
