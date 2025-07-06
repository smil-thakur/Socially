import { Component, inject } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav-bar',
  imports: [HlmButtonDirective],
  templateUrl: './top-nav-bar.html',
  styleUrl: './top-nav-bar.scss',
})
export class TopNavBar {
  private auth = inject(Auth);
  private router = inject(Router);
  public signOut() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']);
        console.log('signed out');
      })
      .catch((error) => {
        console.log('sign out error: ' + error);
      });
  }
}
