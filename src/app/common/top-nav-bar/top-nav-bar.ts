import { Component, inject } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserCacheManager } from '../../cache/user-cache-manager';

@Component({
  selector: 'app-top-nav-bar',
  imports: [HlmButton],
  templateUrl: './top-nav-bar.html',
  styleUrl: './top-nav-bar.scss',
})
export class TopNavBar {
  private auth = inject(Auth);
  private router = inject(Router);
  private userCacheManager = inject(UserCacheManager);
  public logout() {
    signOut(this.auth)
      .then(() => {
        this.userCacheManager.clearCache();
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('sign out error: ' + error);
      });
  }
}
