import { Routes } from '@angular/router';
import { RegisterScreen } from './screens/register-screen/register-screen';
import { LoginScreen } from './screens/login-screen/login-screen';
import { HomeScreen } from './screens/home-screen/home-screen';
import { SocialLinksScreen } from './screens/social-links-screen/social-links-screen';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';
import { SocialLinkViewer } from './viewers/social-link-viewer/social-link-viewer';
import { AnalyticsScreen } from './screens/analytics-screen/analytics-screen';

export const routes: Routes = [
  { path: 'register', component: RegisterScreen, canActivate: [guestGuard] },
  { path: 'login', component: LoginScreen, canActivate: [guestGuard] },
  { path: 'home', component: HomeScreen, canActivate: [authGuard] },
  {
    path: 'social-links',
    component: SocialLinksScreen,
    canActivate: [authGuard],
  },
  {
    path: 'analytics',
    component: AnalyticsScreen,
    canActivate: [authGuard],
  },
  {
    path: 'social-links/:id',
    component: SocialLinkViewer,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
