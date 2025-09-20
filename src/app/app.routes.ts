import { Routes } from '@angular/router';
import { RegisterScreen } from './screens/register-screen/register-screen';
import { LoginScreen } from './screens/login-screen/login-screen';
import { HomeScreen } from './screens/home-screen/home-screen';
import { SocialLinksScreen } from './screens/social-links-screen/social-links-screen';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';
import { SocialLinkViewer } from './viewers/social-link-viewer/social-link-viewer';
import { AnalyticsScreen } from './screens/analytics-screen/analytics-screen';
import { AnalyticsViewer } from './viewers/analytics-viewer/analytics-viewer';
import { ResumeViewer } from './viewers/resume-viewer/resume-viewer';
import { ResumeScreen } from './screens/resume-screen/resume-screen';
import { BentoScreen } from './screens/bento-screen/bento-screen';
import { BentoViewer } from './viewers/bento-viewer/bento-viewer';

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
    path: 'analytics-viewer',
    component: AnalyticsViewer,
    canActivate: [authGuard],
  },
  {
    path: 'resume-viewer/:email',
    component: ResumeViewer,
  },
  {
    path: 'resume',
    component: ResumeScreen,
    canActivate: [authGuard],
  },
  {
    path: 'bento',
    component: BentoScreen,
    canActivate: [authGuard],
  },
  {
    path: 'bento-viewer/:email',
    component: BentoViewer,
  },
  {
    path: 'social-links/:email',
    component: SocialLinkViewer,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
