import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';


// RECOMMENDED
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [LayoutComponent,
    LoginComponent,
    RegisterComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() 
  ]
})
export class LoginModule { }
