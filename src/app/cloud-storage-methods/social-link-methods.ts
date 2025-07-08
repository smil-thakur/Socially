import { doc, collection, addDoc, getDocs } from 'firebase/firestore';
import { getFirestore } from '@angular/fire/firestore';
import type { SocialLink } from '../interfaces/social-link';
import { user } from '@angular/fire/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
export async function getAllSocialLinksForUser(
  userId: string
): Promise<SocialLink[]> {
  const db = getFirestore();
  const socialLinksCol = collection(db, 'User', userId, 'SocialLinks');
  const snapshot = await getDocs(socialLinksCol);
  return snapshot.docs.map((doc) => doc.data() as SocialLink);
}
/**
 * Uploads an icon file to Firebase Storage and returns its download URL.
 * @param userId The user's UID
 * @param file The icon file (Blob or File)
 * @returns The download URL of the uploaded icon */
export async function uploadIconAndGetUrl(
  userId: string,
  file: File | Blob
): Promise<string> {
  const storage = getStorage();
  const fileName = file instanceof File ? file.name : 'icon.png';
  const iconRef = ref(
    storage,
    `user-icons/${userId}/${Date.now()}_${fileName}`
  );
  await uploadBytes(iconRef, file);
  return await getDownloadURL(iconRef);
}
