import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as  data from '../app-helpers/countries.json';
import { ValidationsHelper } from '../app-helpers/validation-Helper';
import { initialDeposit } from '../app-helpers/validation-Helper';
import { InitalDepositSalaried, InitalDepositSavings, Constants } from '../app-helpers/constants';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regform: FormGroup;
  submitted = false;
  loading = false;
  countries: any;
  states: any;
  countryModel: string;
  idTypes: any;
  maritalStatus: any;
  accountType: any;
  citizenStatus: any;
  gudTypes: any;
  maxDate: Date;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private vaildationHelper: ValidationsHelper,
    private router: Router,
    private constants: Constants
  ) { }

  // convenience getter for easy access to form fields
  get forms(): any { return this.regform.controls; }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.idTypes = this.constants.idTypes;
    this.maritalStatus = this.constants.maritalStatus;
    this.accountType = this.constants.accountType;
    this.citizenStatus = this.constants.citizenStatus;
    this.gudTypes = this.constants.gudTypes;

    this.regform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      usrName: ['', Validators.required],
      passwd: ['', Validators.required],
      gudType: ['', [Validators.required]],
      gudName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      addr: ['', [Validators.required]],
      citizen: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      mailId: ['', [Validators.required, Validators.pattern('[A-Za-z0-9.]+@[A-Za-z0-9.]+\\.[a-z]{2,3}')]],
      gender: ['', [Validators.required]],
      marSts: ['', [Validators.required]],
      cantactNo: ['', [Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+')]],
      dob: ['', [Validators.required, this.vaildationHelper.dateOfBirthVaidator]],
      regDate: [new Date(), [Validators.required]],
      accType: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      citizenSts: ['', [Validators.required]],
      intDeposit: ['', [Validators.required,
      Validators.pattern('^[0-9]+')]],
      idType: ['', [Validators.required]],
      idCardNo: ['', [Validators.required]],
      refAccName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      refAccNum: ['', [Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.pattern('^[0-9]+')]],
      refAccAddr: ['', [Validators.required]],
      customerID: ['R-' + Math.floor(Math.random() * (999 - 100 + 1) + 100)],
      accNumber: [Math.floor(Math.random() * (9999999999999999 - 1000000000000000 + 1) + 1000000000000000)]
    },
      {
        // Used custom form validator name
        validator: initialDeposit('accType', 'intDeposit')
      }
    );
    this.countries = data.countries;
    this.states = this.countries.filter((item) => item.country === 'India')[0].states;

  }
  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.regform.invalid) {
      return;
    }
    this.regform.value.dob = this.vaildationHelper.dateFormat(this.regform.value.dob);
    this.regform.value.regDate = this.vaildationHelper.dateFormat(this.regform.value.regDate);
    this.loading = true;
    this.userService.register(this.regform.value)
      .pipe(first())
      .subscribe(
        () => {
          Swal.fire('Registration successful', 'Your Customer Id is: ' + this.regform.value.customerID, 'info');
          this.router.navigate(['account/login']);
        },
        error => {
          Swal.fire('Error', error, 'error');
          this.loading = false;
        });
  }
  onCountriesSelected(event): void {
    this.states = this.countries.filter((item) => item.country === event.target.value)[0].states;
    this.forms.state.setValue('');
  }
  onAccountTypeChange(event): void {
    if (event.target.value === InitalDepositSalaried.AccountType){
      this.forms.intDeposit.setValue(InitalDepositSalaried.Amount);
    }
    else if (event.target.value === InitalDepositSavings.AccountType){
      this.forms.intDeposit.setValue(InitalDepositSavings.Amount);
    }
  }
  onDOBChange(value: Date): void {
    if (!value){
      return;
    }
    const age = this.vaildationHelper.ageCalculator(value);
    if (age <= 18){
      this.forms.citizenSts.setValue('Minor');
    }
    else if (age > 18 && age <= 60){
      this.forms.citizenSts.setValue('Normal');
    }
    else if (age > 60){
      this.forms.citizenSts.setValue('Senior');
    }
  }
}
