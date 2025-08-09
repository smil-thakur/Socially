import { inject, Injectable } from '@angular/core';
import { ResumeDataDTO } from '../interfaces/ResumeDataDTO';
import { ResumeData } from '../interfaces/ResumeData';
import { APIservice } from './apiservice';
import { API } from '../enums/APIenums';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class ResumeDataService {
  private apiService = inject(APIservice);
  private userService = inject(UserService);
  public resumeDataDTO: ResumeDataDTO | null = null;

  public setResumeDataDTO(resumeDataDTO: ResumeDataDTO) {
    this.resumeDataDTO = resumeDataDTO;
  }

  public async getResumeDataFirebase(): Promise<ResumeData | null> {
    const res: ResumeData = await this.apiService.get<ResumeData>(
      API.GETUSERPROFILE,
      await this.userService.getCurrentUserObject().getIdToken()
    );
    if (res) {
      return res;
    } else {
      return null;
    }
  }
}
