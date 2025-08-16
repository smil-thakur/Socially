import { inject, Injectable } from '@angular/core';
import { APIservice } from './apiservice';
import { API } from '../enums/APIenums';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class ResumePdfService {
  private apiService = inject(APIservice);
  private userService = inject(UserService);

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
}
