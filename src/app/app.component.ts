import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Banking Management System';
  user;
  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.user = this.userService.user();

  }
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/account/login']);
    this.user = false;
  }
}
