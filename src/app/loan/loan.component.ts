import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants, RateofIntrest } from '../app-helpers/constants';
import { LoanService } from '../services/loan.service';
import { first } from 'rxjs/operators';
import { requiredValidatorEdu, requiredValidatorHom, patternValidatorEdu, ValidationsHelper } from '../app-helpers/validation-Helper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  loanform: FormGroup;
  submitted = false;
  loanTyp;
  loanDuration;
  showEducation = false;
  showPersonal = false;
  showloan = false;
  loading = false;
  user;
  userLoan = [];
  minDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    private constants: Constants,
    private loanService: LoanService,
    private vaildationHelper: ValidationsHelper
  ) {
    this.user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : '';
    this.loanTyp = this.constants.loanTyp;
    this.loanDuration = this.constants.loanDuration;
  }

  // convenience getter for easy access to form fields
  get forms(): any { return this.loanform.controls; }


  ngOnInit(): void {
    this.showEducation = false;
    this.showPersonal = false;
    this.submitted = false;
    this.minDate = new Date();
    this.loanform = this.formBuilder.group({
      loanTyp: ['', Validators.required],
      loanAmt: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      loanApplyDt: [new Date(), Validators.required],
      loanIssueDt: ['', Validators.required],
      rateOfInt: ['', Validators.required],
      loanDuration: ['', Validators.required],
      courseFee: [''],
      course: [''],
      fatherName: ['', Validators.pattern('[a-zA-Z ]+')],
      fatherOccptn: [''],
      fatherExp: [''],
      fatherCompany: [''],
      rationCrdNo: [''],
      annualIncome: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      companyName: [''],
      totalExp: [''],
      expCurComp: [''],
      customerID: [this.user.customerID],
      isClosed: ['N'],
    },
      {
        // Used custom form validator name
        validator: [requiredValidatorEdu('loanTyp', 'courseFee'),
        requiredValidatorEdu('loanTyp', 'course'),
        requiredValidatorEdu('loanTyp', 'fatherName'),
        requiredValidatorEdu('loanTyp', 'fatherOccptn'),
        requiredValidatorEdu('loanTyp', 'fatherExp'),
        requiredValidatorEdu('loanTyp', 'fatherCompany'),
        requiredValidatorEdu('loanTyp', 'rationCrdNo'),
        requiredValidatorHom('loanTyp', 'companyName'),
        requiredValidatorHom('loanTyp', 'totalExp'),
        requiredValidatorHom('loanTyp', 'expCurComp'),
        patternValidatorEdu('loanTyp', 'courseFee', '^[1-9][0-9]*$')
        ]
      });

    this.bindTable();


  }
  bindTable(): void {
    this.loanService.getAllLoan()
      .subscribe(loans => {
        const filLoan = new Array();
        const loantype = this.constants.loanTyp;
        this.userLoan = loans.filter(x => x.customerID === this.user.customerID);
        this.userLoan.forEach(elementLoan => {
          if (elementLoan.isClosed === 'N') {
            filLoan.push(elementLoan.loanTyp);
          }
        });
        this.loanTyp = loantype.filter(x => !filLoan.includes(x));
        if (this.loanTyp.length > 0) {
          this.showloan = true;
        }
        else {
          this.showloan = false;
        }
      },
        error => {
          Swal.fire('Error', error, 'error');
          this.loading = false;
        });
  }
  onLoanTypeSelected(event): void {
    if (event.target.value === 'Education') {
      this.showEducation = true;
      this.showPersonal = false;
      this.forms.rateOfInt.setValue(RateofIntrest.Education);

    }
    else if (event.target.value === 'Personal/Home') {
      this.showEducation = false;
      this.showPersonal = true;
      this.forms.rateOfInt.setValue(RateofIntrest.Personal);
    }
    else {
      this.showEducation = false;
      this.showPersonal = false;

    }

  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loanform.invalid) {
      return;
    }
    this.loading = true;
    this.loanform.value.loanApplyDt = this.vaildationHelper.dateFormat(this.loanform.value.loanApplyDt);
    this.loanform.value.loanIssueDt = this.vaildationHelper.dateFormat(this.loanform.value.loanIssueDt);
    this.loanService.applyLaon(this.loanform.value)
      .pipe(first())
      .subscribe(
        data => {
          this.bindTable();
          this.ngOnInit();
          Swal.fire('Thank You!', 'Loan applied Successfully', 'info');
          this.loading = false;
        },
        error => {
          Swal.fire('Error', error, 'error');
          this.loading = false;
        });
  }
}
