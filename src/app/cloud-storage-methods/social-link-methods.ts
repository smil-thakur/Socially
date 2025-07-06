import { doc, collection, addDoc } from 'firebase/firestore';
import { getFirestore } from '@angular/fire/firestore';

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

