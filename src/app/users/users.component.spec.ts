import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import {UserService} from '../services/user.service';
import { Constants } from '../app-helpers/constants';
import { ValidationsHelper } from '../app-helpers/validation-Helper';

import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule, ReactiveFormsModule,
                BsDatepickerModule.forRoot(),DatepickerModule.forRoot()],
      declarations: [ UsersComponent ],
      providers:[DatePipe, Constants, ValidationsHelper]
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
});
