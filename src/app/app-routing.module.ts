import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './app-helpers/auth.guard';
import { LoanComponent } from './loan/loan.component';

const LoginModule = () => import('./login/login.module').then(x => x.LoginModule);
const routes: Routes = [    
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent},
  { path: 'account', loadChildren: LoginModule},
  { path: 'loan', component: LoanComponent},
  //otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
