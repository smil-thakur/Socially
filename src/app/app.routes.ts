import { Routes } from '@angular/router';
import { RegisterScreen } from './screens/register-screen/register-screen';
import { LoginScreen } from './screens/login-screen/login-screen';
import { HomeScreen } from './screens/home-screen/home-screen';
import { SocialLinksScreen } from './screens/social-links-screen/social-links-screen';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
  { path: 'register', component: RegisterScreen, canActivate: [guestGuard] },
  { path: 'login', component: LoginScreen, canActivate: [guestGuard] },
  { path: 'home', component: HomeScreen, canActivate: [authGuard] },
  {
    path: 'social-links',
    component: SocialLinksScreen,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
