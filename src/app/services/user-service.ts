import { Injectable, inject } from '@angular/core';
import { Auth, user, User as FirebaseUser } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: Auth) {}

  /**
   * Returns an observable of the current Firebase user (null if not logged in)
   */
  getCurrentUser(): Observable<FirebaseUser | null> {
    return user(this.auth);
  }

  /**
   * Returns the current Firebase user object (or null if not logged in)
   */
  getCurrentUserObject(): FirebaseUser {
    return this.auth.currentUser!;
  }
}
