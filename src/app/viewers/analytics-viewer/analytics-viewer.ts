import { Component, OnInit, inject } from '@angular/core';
import { OnlyBackNavBar } from '../../common/only-back-nav-bar/only-back-nav-bar';
import { UserCacheManager } from '../../cache/user-cache-manager';
import { ResumeDataService } from '../../services/resume-data-service';
import { ResumeData } from '../../interfaces/ResumeData';
import { PreloaderService } from '../../services/preloader-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics-viewer',
  imports: [OnlyBackNavBar, CommonModule],
  templateUrl: './analytics-viewer.html',
  styleUrl: './analytics-viewer.scss',
})
export class AnalyticsViewer implements OnInit {
  private userCacheManager = inject(UserCacheManager);
  private resumeDataService = inject(ResumeDataService);
  private preloaderService = inject(PreloaderService);
  public resumeData: ResumeData | null = null;

  async ngOnInit() {
    this.preloaderService.show();
    if (this.userCacheManager.getCache()) {
      this.resumeData = this.userCacheManager.getCache();
    } else {
      try {
        this.resumeData = await this.resumeDataService.getResumeDataFirebase();
        if (this.resumeData) {
          this.userCacheManager.setCache(this.resumeData);
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
        // Handle error appropriately (e.g., display an error message)
      }
    }
    this.preloaderService.hide();
  }
}
