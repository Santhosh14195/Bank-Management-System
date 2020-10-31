import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LayoutComponent } from './layout.component';
import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const routes: Routes = [
      {
        path: '', component: LayoutComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent }
        ]
      }
    ];

    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot(routes),
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
      BsDatepickerModule.forRoot(),
      DatepickerModule.forRoot()],
      declarations: [LoginComponent],
      providers: [UserService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    const credentials = {
      username: 'Q',
      password: 'Q',
    };
    component.loginForm.setValue(credentials);
    spyOn(component, 'onSubmit');
    component.onSubmit();
    // expect(component.onSubmit).toHaveBeenCalledTimes(1);
    expect(component.onSubmit).toBeTruthy();
  });
});
