import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Constants } from '../app-helpers/constants';
import { ValidationsHelper } from '../app-helpers/validation-Helper';
import { User } from '../models/user';

import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  const user = new User();
  user.customerID = 'R-815';
  user.name = 'santhosh kumar C';
  user.accNumber = '1458545662132';
  user.country = 'India';
  user.state = 'Tamil Nadu';
  user.gender = 'Male';
  user.dob = '10/05/2002';
  user.regDate = '16/10/2020';
  user.bankName = '';
  user.usrName = 'Z';
  user.passwd = 'Z';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule,
        BsDatepickerModule.forRoot(), DatepickerModule.forRoot()],
      declarations: [UsersComponent],
      providers: [DatePipe, Constants, ValidationsHelper]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit', () => {
    expect(component.onSubmit).toBeTruthy();
  });

  it('onDoBChange', () => {
    spyOn(component, 'onDOBChange');
    component.onDOBChange(new Date());
    expect(component.onDOBChange).toHaveBeenCalledTimes(1);
  });
});
