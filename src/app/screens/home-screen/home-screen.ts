import { Component, inject, OnInit } from '@angular/core';
import { BasePageScreen } from '../../common/base-page-screen/base-page-screen';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { TitleCasePipe } from '@angular/common';
import {
  lucideBadgeCheck,
  lucideChartBar,
  lucideContact,
  lucideDownload,
  lucideFilePlus2,
  lucideFileText,
  lucideLayoutGrid,
  lucideLink,
  lucideMail,
  lucidePen,
  lucideQrCode,
  lucideVideo,
} from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { Social } from '../../interfaces/socials';
import { HlmButton } from '@spartan-ng/helm/button';
import { Router } from '@angular/router';
import { TopNavBar } from '../../common/top-nav-bar/top-nav-bar';
import { Auth, idToken, User, user } from '@angular/fire/auth';
import { UserService } from '../../services/user-service';
import { APIservice } from '../../services/apiservice';
import { API } from '../../enums/APIenums';
import { PreloaderService } from '../../services/preloader-service';
import { ResumeDataDTO } from '../../interfaces/ResumeDataDTO';
import { ResumeDataService } from '../../services/resume-data-service';

@Component({
  selector: 'app-home-screen',
  imports: [
    NgIcon,
    HlmIcon,
    HlmCardImports,
    HlmButton,
    TopNavBar,
    TitleCasePipe,
  ],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.scss',
  providers: [
    provideIcons({
      lucideLayoutGrid,
      lucideLink,
      lucideContact,
      lucideFileText,
      lucideBadgeCheck,
      lucidePen,
      lucideMail,
      lucideQrCode,
      lucideChartBar,
      lucideDownload,
      lucideVideo,
      lucideFilePlus2,
    }),
  ],
})
export class HomeScreen extends BasePageScreen implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private apiService: APIservice,
    private preloaderService: PreloaderService,
    private resumeDataService: ResumeDataService
  ) {
    super();
  }

  public gUser: User | null = null;

  ngOnInit(): void {
    this.gUser = this.userService.getCurrentUserObject();
  }

  public socials: Social[] = [
    {
      type: 'social-links',
      icon: 'lucideLink',
      desc: 'Organize all your social media profiles in one place',
      route: 'social-links',
    },
    {
      type: 'digital-card',
      icon: 'lucideContact',
      desc: 'Your modern business card to share digitally',
      route: 'social-links',
    },
    {
      type: 'resume',
      icon: 'lucideFileText',
      desc: 'Showcase your professional CV or resume',
      route: 'resume',
    },
    {
      type: 'bento',
      icon: 'lucideLayoutGrid',
      desc: 'A portfolio built using modular bento cards to showcase your projects, skills, and achievements',
      route: 'bento',
    },
    {
      type: 'skills-certifications',
      icon: 'lucideBadgeCheck',
      desc: 'Highlight your skills and certifications',
      route: 'social-links',
    },
    {
      type: 'blog',
      icon: 'lucidePen',
      desc: 'Write and share articles to build your personal brand',
      route: 'social-links',
    },
    {
      type: 'analytics',
      icon: 'lucideChartBar',
      desc: 'See who views your card and profile',
      route: 'analytics',
    },
    {
      type: 'video-intro',
      icon: 'lucideVideo',
      desc: 'Add a quick video introduction to make a personal connection',
      route: 'social-links',
    },
  ];

  public navigateToScreen(route: string) {
    this.router.navigate([route]);
  }

  public async pdfSelection(event: Event) {
    this.preloaderService.show();
    const input = event.target as HTMLInputElement;
    if (input) {
      if (input.files) {
        if (input.files[0]) {
          const formData = new FormData();
          formData.append('file', input.files[0]);
          const tokenId = await this.userService
            .getCurrentUserObject()
            .getIdToken();
          const res = await this.apiService.post(
            API.SCANPDF,
            formData,
            tokenId
          );
          try {
            const resumeData = res as ResumeDataDTO;
            this.resumeDataService.setResumeDataDTO(resumeData);
            this.router.navigate(['/analytics']);
          } catch (err) {
            console.error(err);
          }
          this.preloaderService.hide();
        }
      }
    }
    this.preloaderService.hide();
  }

  public navigateToViewer(type: string) {
    switch (type) {
      case 'social-links':
        this.router.navigate(['/social-links', this.gUser?.email]);
        break;
      case 'analytics':
        this.router.navigate(['/analytics-viewer']);
        break;
      case 'resume':
        this.router.navigate(['/resume-viewer', this.gUser?.email]);
        break;
      case 'bento':
        this.router.navigate(['/bento-viewer', this.gUser?.email]);
        break;
      default:
        break;
    }
  }
}
