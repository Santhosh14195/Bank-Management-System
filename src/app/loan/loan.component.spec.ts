import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Constants } from '../app-helpers/constants';
import { LoanService } from '../services/loan.service';

import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoanComponent } from './loan.component';

describe('LoanComponent', () => {
  let component: LoanComponent;
  let fixture: ComponentFixture<LoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,HttpClientTestingModule,RouterTestingModule],
      declarations: [ LoanComponent ],
      providers:[Constants,LoanService,DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
