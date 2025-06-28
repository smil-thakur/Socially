import { Routes } from '@angular/router';
import { RegisterScreen } from './screens/register-screen/register-screen';
import { LoginScreen } from './screens/login-screen/login-screen';

export const routes: Routes = [
  { path: 'register', component: RegisterScreen },
  { path: 'login', component: LoginScreen },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
