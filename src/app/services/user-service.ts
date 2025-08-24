import { Injectable, Injector, inject } from '@angular/core';
import { Auth, user, User as FirebaseUser } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { APIservice } from './apiservice';
import { API } from '../enums/APIenums';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: Auth, private apiService: APIservice) {}

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

  async mapIDwithEmail(): Promise<void> {
    this.apiService.post(
      API.MAP_ID_TO_EMAIL,
      null,
      await this.getCurrentUserObject().getIdToken()
    );
  }

  async getUserIdFromEmail(email: string): Promise<string | null> {
    return (
      (await this.apiService.get(
        API.GET_ID_FROM_EMAIL,
        { email: email },
        null
      )) as any
    )['id'];
  }
}
