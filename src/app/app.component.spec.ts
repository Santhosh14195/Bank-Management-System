import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './app-helpers/auth.guard';
import { LoanComponent } from './loan/loan.component';
import { AppRoutingModule } from './app-routing.module';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Constants } from './app-helpers/constants';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';


describe('AppComponent', () => {
  const LoginModule = () => import('./login/login.module').then(x => x.LoginModule);
const routes: Routes = [    
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent},
  { path: 'account', loadChildren: LoginModule},
  { path: 'loan', component: LoanComponent},
  //otherwise redirect to home
  { path: '**', redirectTo: '' }
];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot(),
        RouterModule.forRoot(routes)
      ],
      declarations: [
        AppComponent,
        UsersComponent,
        HomeComponent,
        LoanComponent
      ],
      providers: [
        {provide:HttpClientModule},
        DatePipe,
        Constants,
        AuthGuard
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Banking Management System'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Banking Management System');
  });

  it('should logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.logout).toBeTruthy();
  });

  it('should not have user', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.user).toBeTruthy();
  });
});
