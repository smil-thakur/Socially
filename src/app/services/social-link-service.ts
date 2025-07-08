import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
} from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { SocialLink } from '../interfaces/social-link';

@Injectable({ providedIn: 'root' })
export class SocialLinkService {
  constructor(private firestore: Firestore) {}

  async addSocialLinkForUser(userId: string, socialLink: any) {
    const socialLinksCol = collection(
      this.firestore,
      'User',
      userId,
      'SocialLinks'
    );
    const docRef = await addDoc(socialLinksCol, socialLink);
    return docRef;
  }

  async getAllSocialLinksForUser(userId: string): Promise<SocialLink[]> {
    const socialLinksCol = collection(
      this.firestore,
      'User',
      userId,
      'SocialLinks'
    );
    const snapshot = await getDocs(socialLinksCol);
    return snapshot.docs.map((doc) => doc.data() as SocialLink);
  }

  async uploadIconAndGetUrl(
    userId: string,
    file: File | Blob
  ): Promise<string> {
    const storage = getStorage(); // Optional: you can also DI storage
    const fileName = file instanceof File ? file.name : 'icon.png';
    const iconRef = ref(
      storage,
      `user-icons/${userId}/${Date.now()}_${fileName}`
    );
    await uploadBytes(iconRef, file);
    return await getDownloadURL(iconRef);
  }
}
