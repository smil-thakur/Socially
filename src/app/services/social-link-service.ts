import { Injectable, Injector } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import type { SocialLink } from '../interfaces/social-link';
import { runAsyncInInjectionContext } from '../firebase-fixes/injection-fix';
import { SocialLinkGreeting } from '../interfaces/social-link-greeting';
import { APIservice } from './apiservice';
import { UserService } from './user-service';
@Injectable({ providedIn: 'root' })
export class SocialLinkService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private injector: Injector,
    private apiService: APIservice,
    private userService: UserService
  ) {}

  async addSocialLinkForUser(userId: string, socialLink: SocialLink) {
    return await runAsyncInInjectionContext(this.injector, async () => {
      const socialLinksCol = collection(
        this.firestore,
        'User',
        userId,
        'SocialLinks'
      );
      const docRef = await addDoc(socialLinksCol, socialLink);
      return docRef;
    });
  }

  async addSocialLinkGreeting(
    socialLinkGreeting: SocialLinkGreeting,
    onStart?: () => void,
    onComplete?: () => void,
    onError?: () => void
  ) {
    const idTocken = await this.userService.getCurrentUserObject().getIdToken();
    await this.apiService.post<SocialLinkGreeting>(
      '/addSocialGreeting',
      socialLinkGreeting,
      idTocken,
      onStart,
      onComplete,
      onError
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

  async uploadIconAndGetUrl(
    userId: string,
    file: File | Blob
  ): Promise<string> {
    return await runAsyncInInjectionContext(this.injector, async () => {
      const storage = this.storage;
      const fileName = file instanceof File ? file.name : 'icon.png';
      const iconRef = ref(
        storage,
        `user-icons/${userId}/${Date.now()}_${fileName}`
      );
      await uploadBytes(iconRef, file);
      return await getDownloadURL(iconRef);
    });
  }
}
