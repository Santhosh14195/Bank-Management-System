import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HomeComponent } from './home/home.component';
import { LoanComponent } from './loan/loan.component';
import { Constants } from './app-helpers/constants';
import { LoanService } from './services/loan.service';
import { UserService } from './services/user.service';
import { ErrorInterceptor } from './app-helpers/interceptor-error'


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    LoanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  providers: [
    {provide:HttpClientModule},
    DatePipe,
    Constants,
    UserService,
    LoanService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
