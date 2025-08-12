import { Injectable } from '@angular/core';
import { ResumeData } from '../interfaces/ResumeData';

@Injectable({
  providedIn: 'root',
})
export class UserCacheManager {
  protected userCache: ResumeData | null = null;
  public setCache(data: ResumeData) {
    this.userCache = data;
  }
  public getCache(): ResumeData | null {
    return this.userCache;
  }
  public clearCache() {
    this.userCache = null;
  }
}
