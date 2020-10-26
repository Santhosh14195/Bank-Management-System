import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) 
  { }
  applyLaon(loan) {
    return this.http.post(`${environment.apiUrl}/loans`, loan);
  }
  getAllLoan() {
    return this.http.get<any[]>(`${environment.apiUrl}/loans`);
  }
}
