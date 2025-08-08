import { Injectable } from '@angular/core';
import { ResumeDataDTO } from '../interfaces/ResumeDataDTO';

@Injectable({
  providedIn: 'root',
})
export class ResumeDataService {
  constructor() {}

  public resumeDataDTO: ResumeDataDTO | null = null;

  public setResumeDataDTO(resumeDataDTO: ResumeDataDTO) {
    this.resumeDataDTO = resumeDataDTO;
  }
}
