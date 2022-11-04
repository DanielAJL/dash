import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './register-and-login/login/login.component';
import { RegisterComponent } from './register-and-login/register/register.component';
import { UsersComponent } from './users/users.component';
import { SingleUserComponent } from './users/single-user/single-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '*',
    component: LoginComponent,
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard],
  },

  { path: 'login', component: LoginComponent, canActivate: [RedirectGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [RedirectGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'users', canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: 'profile', component: SingleUserComponent },
      { path: '', pathMatch: 'full', component: UsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RedirectGuard],
})
export class AppRoutingModule { }
