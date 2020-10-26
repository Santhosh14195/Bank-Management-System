import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import  *  as  data  from  '../app-helpers/countries.json';
import {ValidationsHelper} from '../app-helpers/validation-Helper';
import {UserService} from '../services/user.service';
import { Constants } from '../app-helpers/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  countries:any;
  states:any;
  countryModel:string;
  user;
  state:string;
  idTypes:any;
  maritalStatus:any;
  accountType:any;
  citizenStatus:any;
  gudTypes:any;


  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private router: Router,
    private vaildationHelper:ValidationsHelper,
    private constants: Constants
  ) {
    this.user=JSON.parse(localStorage.getItem("user"));
  }

    // convenience getter for easy access to form fields
    get forms() { return this.form.controls; }

  ngOnInit(): void {    
      this.idTypes = this.constants.idTypes;
      this.maritalStatus = this.constants.maritalStatus;
      this.accountType = this.constants.accountType;
      this.citizenStatus = this.constants.citizenStatus;
      this.gudTypes = this.constants.gudTypes;

    this.form = this.formBuilder.group({
      customerID: ['', Validators.required],
      name: ['', [Validators.required,Validators.pattern('[a-zA-Z ]+')]],
      accNumber: ['', Validators.required],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob:['',[Validators.required,this.vaildationHelper.dateOfBirthVaidator]],
      regDate:['',[Validators.required]],
      bankName:['',[Validators.required]],
      branchName:['',[Validators.required]],
      idType:['',[Validators.required]],
      idCardNo:['',[Validators.required]],
      refAccName:['',[Validators.required,Validators.pattern('[a-zA-Z ]+')]],
      refAccNum:['',[Validators.required,
                     Validators.minLength(16),
                     Validators.maxLength(16),
                     Validators.pattern('^[0-9]+')]],
      refAccAddr:['',[Validators.required]],
      addr:['',[Validators.required]],
      cantactNo:['',[Validators.required,
                     Validators.minLength(10),
                     Validators.maxLength(10),
                     //Validators.pattern('^[6-9][0-9]{9}$')
                     Validators.pattern('^[0-9]+')]],
      mailId:['',[Validators.required, Validators.pattern('[A-Za-z0-9.]+@[A-Za-z0-9.]+\\.[a-z]{2,3}')]],
      marSts:['',[Validators.required]],
      accType:['',[Validators.required]],
      citizen:['',[Validators.required]],
      citizenSts:['',[Validators.required]],
      gudType:['',[Validators.required]],
      gudName:['',[Validators.required,Validators.pattern('[a-zA-Z ]+')]],
      usrName:[this.user.usrName],
      passwd:[this.user.passwd],
    });
 
    this.countries=data["countries"];  

      this.userService.getById(this.user.id)
                .pipe(first())
                .subscribe(x => {  
                    this.states = this.countries.filter((item) => item.country == x.country)[0]["states"];
                    this.forms.customerID.setValue(x.customerID);
                    this.forms.name.setValue(x.name);
                    this.forms.accNumber.setValue(x.accNumber);
                    this.forms.country.setValue(x.country);                                  
                    this.forms.state.setValue(x.state);
                    this.forms.gender.setValue(x.gender);
                    this.forms.dob.setValue(x.dob);                    
                    this.forms.regDate.setValue(x.regDate);
                    this.forms.bankName.setValue(x.bankName);
                    this.forms.branchName.setValue(x.branchName);
                    this.forms.idType.setValue(x.idType);
                    this.forms.idCardNo.setValue(x.idCardNo);
                    this.forms.refAccName.setValue(x.refAccName);
                    this.forms.refAccNum.setValue(x.refAccNum);
                    this.forms.refAccAddr.setValue(x.refAccAddr);
                    this.forms.addr.setValue(x.addr);
                    this.forms.cantactNo.setValue(x.cantactNo);
                    this.forms.mailId.setValue(x.mailId);
                    this.forms.marSts.setValue(x.marSts);
                    this.forms.accType.setValue(x.accType);
                    this.forms.citizen.setValue(x.citizen);
                    this.forms.citizenSts.setValue(x.citizenSts);
                    this.forms.gudType.setValue(x.gudType);
                    this.forms.gudName.setValue(x.gudName);

                },
                error => {
                    Swal.fire("Error",error,"error");
                    this.loading = false;
                });


  
  
  }
  onSubmit() {
    this.submitted = true;
      // stop here if form is invalid
            if (this.form.invalid) {
              return;
          }
            this.form.value.dob=this.vaildationHelper.dateFormat(this.form.value.dob);
            this.form.value.regDate=this.vaildationHelper.dateFormat(this.form.value.regDate);
            this.loading = true;
            this.userService.update(this.user.id, this.form.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.loading = false;
                        Swal.fire('Account updated successful');
                        this.router.navigate(['/users']);
                    },
                    error => {
                        Swal.fire("Error",error,"error");
                        this.loading = false;
                    });
  }
  onCountriesSelected(event){
    this.states = this.countries.filter((item) => item.country == event.target.value)[0]["states"];
  }
  onDOBChange(value: Date): void {
    if(!value)
    return;
    let age = this.vaildationHelper.ageCalculator(value);
    if(age <= 18)
      this.forms.citizenSts.setValue('Minor');
    else if(age >18 && age <= 60)
      this.forms.citizenSts.setValue('Normal');
    else if(age > 60)
      this.forms.citizenSts.setValue('Senior');
  }

  
}
