import { Injectable } from '@angular/core';
import{DatePipe} from '@angular/common';
import { FormGroup, AbstractControl } from '@angular/forms';
import { InitalDepositSavings } from './constants';

@Injectable({
    providedIn: 'root'
  })

export class ValidationsHelper{
    constructor (public datepipe:DatePipe){}

    dateFormat(date){
        let formatedDate=new Date(date).toString();
        if(date.toString().split('/').length==3)
        {
            let splitedDate=date.toString().split('/');
            formatedDate=splitedDate[1]+'/'+splitedDate[0]+'/'+splitedDate[2]
        }
        return this.datepipe.transform(formatedDate, 'dd/MM/yyyy');
    }
    dateOfBirthVaidator(AC: AbstractControl) {
        if (AC && AC.value ) {
             let date=AC.value
             let formatedDate=new Date(date).toString();
            if(date.toString().split('/').length==3)
            {
                let splitedDate=date.toString().split('/');
                formatedDate=splitedDate[1]+'/'+splitedDate[0]+'/'+splitedDate[2]
            }
            let timeDiff = Math.abs(Date.now() - new Date(formatedDate).getTime());
            let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);   
          return age>=18 && age<=96? null : { 'dateVaidator': true };
        }
        return null;
      }
      ageCalculator(date):number{
        let formatedDate=new Date(date).toString();
        if(date.toString().split('/').length==3)
        {
            let splitedDate=date.toString().split('/');
            formatedDate=splitedDate[1]+'/'+splitedDate[0]+'/'+splitedDate[2]
        }
        let timeDiff = Math.abs(Date.now() - new Date(formatedDate).getTime());
        let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
        return age
      }
      
      
}
export function initialDeposit(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.depositVaidator) {
      return;
    }

    if (control.value == InitalDepositSavings.AccountType && matchingControl.value != InitalDepositSavings.Amount) {
      matchingControl.setErrors({ depositVaidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };

  
}

export function requiredValidatorEdu(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.required) {
      return;
    }

    if (control.value == "Education" && !matchingControl.value) {
        matchingControl.setErrors({ required: true });
    } else {
      matchingControl.setErrors(null);
    }
  };

  
}

export function requiredValidatorHom(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.required) {
      return;
    }

    if (control.value == "Personal/Home" && !matchingControl.value) {
        matchingControl.setErrors({ required: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

