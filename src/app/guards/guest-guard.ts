import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return user(auth).pipe(
    map((currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    })
  );
};
