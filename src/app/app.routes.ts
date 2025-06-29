import { Routes } from '@angular/router';
import { RegisterScreen } from './screens/register-screen/register-screen';
import { LoginScreen } from './screens/login-screen/login-screen';
import { HomeScreen } from './screens/home-screen/home-screen';
import { SocialLinksScreen } from './screens/social-links-screen/social-links-screen';

export const routes: Routes = [
  { path: 'register', component: RegisterScreen },
  { path: 'login', component: LoginScreen },
  { path: 'home', component: HomeScreen },
  { path: 'social-links', component: SocialLinksScreen },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
