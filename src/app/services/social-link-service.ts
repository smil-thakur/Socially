import { Injectable, Injector } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import type { SocialLink } from '../interfaces/social-link';
import { runAsyncInInjectionContext } from '../firebase-fixes/injection-fix';
import { SocialLinkGreeting } from '../interfaces/social-link-greeting';
import { APIservice } from './apiservice';
import { UserService } from './user-service';
import { API } from '../enums/APIenums';
@Injectable({ providedIn: 'root' })
export class SocialLinkService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private injector: Injector,
    private apiService: APIservice,
    private userService: UserService
  ) {}

  async addSocialLinkForUser(socialLink: SocialLink) {
    const idTocken = await this.userService.getCurrentUserObject().getIdToken();
    await this.apiService.post<SocialLink>(
      API.ADDSOCIALLINK,
      socialLink,
      idTocken
    );
  }

  async addSocialLinkGreeting(socialLinkGreeting: SocialLinkGreeting) {
    const idTocken = await this.userService.getCurrentUserObject().getIdToken();
    await this.apiService.post<SocialLinkGreeting>(
      API.ADDSOCIALGREETING,
      socialLinkGreeting,
      idTocken
    );
  }

  async getAllSocialLinksForUser(userId: string): Promise<SocialLink[]> {
    return await runAsyncInInjectionContext(this.injector, async () => {
      const socialLinksCol = collection(
        this.firestore,
        'User',
        userId,
        'SocialLinks'
      );
      const snapshot = await getDocs(socialLinksCol);
      return snapshot.docs.map((doc) => doc.data() as SocialLink);
    });
  }

  async getSocialLinkGreeting(
    userId: string
  ): Promise<SocialLinkGreeting | null> {
    return await runAsyncInInjectionContext(this.injector, async () => {
      const greetingDocRef = doc(
        this.firestore,
        'User',
        userId,
        'SocialLinkGreeting',
        'greeting'
      );
      const greetingSnap = await getDoc(greetingDocRef);

      if (greetingSnap.exists()) {
        return greetingSnap.data() as SocialLinkGreeting;
      } else {
        return null;
      }
    });
  }

  async uploadIconAndGetUrl(file: File): Promise<string> {
    const idTocken = await this.userService.getCurrentUserObject().getIdToken();
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.apiService.post(
      API.UPLOADICON,
      formData,
      idTocken
    );
    return response['url'];
  }
}
