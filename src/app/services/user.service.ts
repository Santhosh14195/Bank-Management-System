import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getById(id: string): any {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }
  register(user: User): any {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }
  update(id, params): any {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params);
  }

  getAll(): any {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }
  user(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    }
    else {
      this.router.navigate(['/account/login']);
      return false;
    }

  }
}
