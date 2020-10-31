import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user;
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : '';
    if (!this.user) {
      this.router.navigate(['/account/login']);
    }
  }

}
