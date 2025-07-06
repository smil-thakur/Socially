import { doc, collection, addDoc, getDocs } from 'firebase/firestore';
import { getFirestore } from '@angular/fire/firestore';
import type { SocialLink } from '../interfaces/social-link';

/**
 * Adds a social link to the user's SocialLinks subcollection.
 * @param userId The user's UID
 * @param socialLink The social link object to add
 * @returns The created document reference
 */
export async function addSocialLinkForUser(userId: string, socialLink: any) {
  const db = getFirestore();
  const socialLinksCol = collection(db, 'User', userId, 'SocialLinks');
  const docRef = await addDoc(socialLinksCol, socialLink);
  return docRef;
}

/**
 * Fetches all social links for a given user ID from the SocialLinks subcollection.
 * @param userId The user's UID
 * @returns An array of social link objects (with their Firestore document IDs)
 */
export async function getAllSocialLinksForUser(userId: string): Promise<SocialLink[]> {
  const db = getFirestore();
  const socialLinksCol = collection(db, 'User', userId, 'SocialLinks');
  const snapshot = await getDocs(socialLinksCol);
  return snapshot.docs.map(doc => doc.data() as SocialLink);
}

