import { Component, OnInit, inject } from '@angular/core';
import { OnlyBackNavBar } from '../../common/only-back-nav-bar/only-back-nav-bar';
import { UserCacheManager } from '../../cache/user-cache-manager';
import { ResumeDataService } from '../../services/resume-data-service';
import { ResumeData } from '../../interfaces/ResumeData';
import { PreloaderService } from '../../services/preloader-service';
import { CommonModule } from '@angular/common';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ErrorDialog } from '../../common/error-dialog/error-dialog';
import { BasePageScreen } from '../../common/base-page-screen/base-page-screen';

@Component({
  selector: 'app-analytics-viewer',
  imports: [OnlyBackNavBar, CommonModule],
  templateUrl: './analytics-viewer.html',
  styleUrl: './analytics-viewer.scss',
})
export class AnalyticsViewer extends BasePageScreen implements OnInit {
  private userCacheManager = inject(UserCacheManager);
  private resumeDataService = inject(ResumeDataService);
  private preloaderService = inject(PreloaderService);
  public resumeData: ResumeData | null = null;
  public hlmDialogService = inject(HlmDialogService);

  async ngOnInit() {
    this.preloaderService.show();
    if (this.userCacheManager.getCache()) {
      this.resumeData = this.userCacheManager.getCache();
    } else {
      try {
        this.resumeData = await this.resumeDataService.getResumeDataFirebase();
        if (this.resumeData) {
          this.userCacheManager.setCache(this.resumeData);
        } else {
          this.hlmDialogService.open(ErrorDialog, {
            context: {
              error: 'Can not get your profile Details',
              desc: 'Make sure you go to analytics page to check if your profile data is valid and save!',
            },
          });
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    }
    this.preloaderService.hide();
  }
}
