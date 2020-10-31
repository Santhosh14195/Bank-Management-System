import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { User } from '../models/user';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]

    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should fetch all users`, () => {
    service.getAll()
      .subscribe((users: any) => {
        expect(users.length).toBeGreaterThan(0);
      });
  });

  it(`should'nt have user`, () => {
    expect(service.user()).toBe(false);
  });

  it(`should have user`, () => {
    localStorage.setItem('user', 'R-123');
    expect(service.user()).toBe(true);
    localStorage.removeItem('user');
  });

  it(`should fetch user by ID`, () => {
    service.getById('1')
      .subscribe((user: any) => {
        expect(user.customerID).toBe('R-123');
      });
  });

  it(`should updateUser`, () => {
    const user = [{
      customerID: 'R-123',
      name: 'santhosh kumar C',
      accNumber: '1458545662132',
      country: 'India',
      state: 'Tamil Nadu',
      gender: 'Male',
      dob: '10/05/2002',
      regDate: '16/10/2020',
      bankName: 'HDFC',
      branchName: 'Coimbatore',
      idType: 'Aadhaar card',
      idCardNo: '154644514',
      refAccName: 'Rajesh',
      refAccNum: '1458545662134',
      refAccAddr: '8/12, Coimbatore-641008',
      addr: '8/118, Tirupur-641608',
      cantactNo: '7502621788',
      mailId: 'santhsh@gmail.com',
      marSts: 'Single',
      accType: 'Savings',
      citizen: 'Indian',
      citizenSts: 'Minor',
      gudType: 'Father',
      gudName: 'Chokkalingam',
      id: 1
    }];
    service.update(1, user)
      .subscribe(data => {
        expect(data).toBeTruthy();
      });
  });

  it(`should insertUser`, () => {
    const user = new User();
    user.customerID = 'R-815';
    user.name = 'santhosh kumar C';
    user.accNumber = '1458545662132';
    user.country = 'India';
    user.state = 'Tamil Nadu';
    user.gender = 'Male';
    user.dob = '10/05/2002';
    user.regDate = '16/10/2020';
    user.bankName = '';
    user.usrName = 'Z';
    user.passwd = 'Z';
    service.register(user)
      .subscribe(data => {
        expect(data).toBeTruthy();
      });
  });

});
