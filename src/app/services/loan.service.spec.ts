import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoanService } from './loan.service';
import { error } from 'protractor';

describe('LoanService', () => {
  let service: LoanService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoanService]
    });
    service = TestBed.inject(LoanService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should fetch loans`, () => {
    service.getAllLoan()
      .subscribe((loans: any) => {
        expect(loans.length).toBeTruthy();
      });
  });

  it(`should post loan`, () => {
    const loan = [
      {
        annualIncome: '631',
        companyName: 'CTS',
        course: '',
        courseFee: '',
        customerID: 'R-789',
        expCurComp: 'dh',
        fatherCompany: '',
        fatherExp: '',
        fatherName: '',
        fatherOccptn: '',
        loanAmt: '5000',
        loanApplyDt: '21/10/2020',
        loanDuration: '5',
        loanIssueDt: '21/10/2020',
        loanTyp: 'Personal/Home',
        rateOfInt: '11.25%',
        rationCrdNo: '',
        totalExp: 'ddh',
        isClosed: 'N'
      }];
    service.applyLaon(loan)
      .subscribe(data => {
        expect(data).toBeTruthy();
      });
  });

});
