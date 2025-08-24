import { inject, Injectable, Injector } from '@angular/core';
import { APIservice } from './apiservice';
import { API } from '../enums/APIenums';
import { UserService } from './user-service';
import { runAsyncInInjectionContext } from '../firebase-fixes/injection-fix';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ResumePdfService {
  private apiService = inject(APIservice);
  private userService = inject(UserService);
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  public async generatePDFFromLatex(latexContent: string): Promise<Blob> {
    try {
      const blob = new Blob([latexContent], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('file', blob, 'resume.tex');
      return await this.apiService.postBlob(
        API.GETPDFFROMLATEX,
        formData,
        await this.userService.getCurrentUserObject().getIdToken()
      );
    } catch (err: any) {
      throw new Error(err.message || 'Failed to generate PDF');
    }
  }

  public async getSaveTexURL(): Promise<string | null> {
    return await runAsyncInInjectionContext(this.injector, async () => {
      const resumeTexRef = doc(
        this.firestore,
        'User',
        this.userService.getCurrentUserObject().uid,
        'Texs',
        'resume'
      );
      const resumeTexSnap = await getDoc(resumeTexRef);

      if (resumeTexSnap.exists()) {
        return resumeTexSnap.data()['url'] as string;
      } else {
        return null;
      }
    });
  }

  public async getSaveTexContent(): Promise<string | null> {
    const textUrl = await this.getSaveTexURL();
    try {
      const res = (await this.apiService.get(
        API.GETTEXCONTENT,
        null,
        await this.userService.getCurrentUserObject().getIdToken()
      )) as any;
      return res['latex'];
    } catch (err: any) {
      throw new Error(err.message || 'Failed to load Tex file');
    }
  }

  public async saveTex(latexContent: string): Promise<string> {
    try {
      const blob = new Blob([latexContent], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('file', blob, 'resume.tex');
      return await this.apiService.post(
        API.SAVETEX,
        formData,
        await this.userService.getCurrentUserObject().getIdToken()
      );
    } catch (err: any) {
      throw new Error(err.message || 'Failed to save PDF');
    }
  }
}
