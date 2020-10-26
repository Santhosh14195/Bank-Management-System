import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {UserService} from '../services/user.service';
import Swal from 'sweetalert2';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService:UserService,
    private router: Router) {
      if (this.userService.user()) {
        this.router.navigate(['/']);
       }
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get forms() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
  }
    this.userService.getAll()
                .pipe(first())
                .subscribe(users => { 
                    const user = users.find(x => x.usrName === this.forms.username.value && x.passwd === this.forms.password.value);
                    if(user)  
                    {                 
                      this.router.navigate([this.returnUrl]);
                      localStorage.setItem("user",JSON.stringify(user));
                      window.location.reload();
                    }
                    else{
                      Swal.fire("UserName or Password incorrect",'','warning');
                      localStorage.removeItem("user");
                    }                      
                    },
                error => {
                  Swal.fire("Error",error,'error');
                    this.loading = false;
                }); 
  
  }

}
