import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../app-helpers/constants';
import { LoanService } from '../services/loan.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { requiredValidatorEdu, requiredValidatorHom, ValidationsHelper } from '../app-helpers/validation-Helper'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

loanform : FormGroup;
submitted = false;
loanTyp;
loanDuration;
showEducation = false;
showPersonal = false;
showloan = false;
loading=false;
user;
userLoan=[];

constructor(private formBuilder: FormBuilder,
            private constants: Constants,
            private loanService :LoanService,
            private vaildationHelper: ValidationsHelper,
            private router:Router) {
              this.user = JSON.parse(localStorage.getItem("user"));
              this.loanTyp = this.constants.loanTyp;
              this.loanDuration = this.constants.loanDuration;
             }

      // convenience getter for easy access to form fields
    get forms() { return this.loanform.controls; }


  ngOnInit(): void {
    this.showEducation = false;
    this.showPersonal = false;
    this.submitted = false;
    this.loanform = this.formBuilder.group({
      loanTyp: ['', Validators.required], 
      loanAmt: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
      loanApplyDt:[new Date(), Validators.required],
      loanIssueDt:['', Validators.required],
      rateOfInt:['', Validators.required],
      loanDuration:['', Validators.required],
      courseFee:[''],
      course:[''],
      fatherName:['',Validators.pattern('[a-zA-Z ]+')],
      fatherOccptn:[''],
      fatherExp:[''],
      fatherCompany:[''],
      rationCrdNo:[''],
      annualIncome:['',Validators.required],
      companyName:[''],
      totalExp:[''],
      expCurComp:[''],
      customerID:[this.user.customerID],
      isClosed: ['N'],
    },
    {
      // Used custom form validator name
      validator: [requiredValidatorEdu("loanTyp", "courseFee"),
                  requiredValidatorEdu("loanTyp", "course"),
                  requiredValidatorEdu("loanTyp", "fatherName"),
                  requiredValidatorEdu("loanTyp", "fatherOccptn"),
                  requiredValidatorEdu("loanTyp", "fatherExp"),
                  requiredValidatorEdu("loanTyp", "fatherCompany"),
                  requiredValidatorEdu("loanTyp", "rationCrdNo"),
                  requiredValidatorHom("loanTyp", "companyName"),
                  requiredValidatorHom("loanTyp", "totalExp"),
                  requiredValidatorHom("loanTyp", "expCurComp")
                ]
    });

    this.bindTable();
    

  } 
  bindTable() {
    this.loanService.getAllLoan()
                  .subscribe(loans => {   
                      let filLoan = new Array();
                      let loantype = this.constants.loanTyp;
                      this.userLoan = loans.filter(x => x.customerID === this.user.customerID);
                      this.userLoan.forEach(elementLoan => {                        
                        if(elementLoan.isClosed == "N")
                          filLoan.push(elementLoan.loanTyp);
                      });
                      this.loanTyp = loantype.filter(x => !filLoan.includes(x));;
                      if(this.loanTyp.length > 0)
                          this.showloan = true;
                      else
                          this.showloan = false;
                      },
                  error => {
                      Swal.fire('Error',error,'error');
                      this.loading = false;
                  }); 
}
  onLoanTypeSelected(event){
    if(event.target.value=="Education")
    {
      this.showEducation = true;
      this.showPersonal = false;
      this.forms.rateOfInt.setValue("9.5%");      

    }
    else if(event.target.value=="Personal/Home")
    {
      this.showEducation = false;
      this.showPersonal = true;
      this.forms.rateOfInt.setValue("11.25%");      
    }
    else{
      this.showEducation = false;
      this.showPersonal = false;
      
    }


  }

  onSubmit(){
    this.submitted = true;
   if(this.loanform.invalid)
    return;
    this.loading = true;
    this.loanform.value.loanApplyDt = this.vaildationHelper.dateFormat(this.loanform.value.loanApplyDt);
    this.loanform.value.loanIssueDt = this.vaildationHelper.dateFormat(this.loanform.value.loanIssueDt); 
    this.loanService.applyLaon(this.loanform.value)
              .pipe(first())
              .subscribe(
                  data => {
                      this.bindTable();
                      this.ngOnInit();                      
                      Swal.fire('Thank You!','Loan applied Successfully','info');
                      this.loading = false;
                  },
                  error => {
                      Swal.fire('Error',error,'error');
                      this.loading = false;
                  });
  }
}
