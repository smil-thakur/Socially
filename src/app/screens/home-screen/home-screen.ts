import { Component, inject, OnInit } from '@angular/core';
import { BasePageScreen } from '../../common/base-page-screen/base-page-screen';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import {
  lucideBadgeCheck,
  lucideChartBar,
  lucideContact,
  lucideDownload,
  lucideFilePlus2,
  lucideFileText,
  lucideLink,
  lucideMail,
  lucidePen,
  lucideQrCode,
  lucideVideo,
} from '@ng-icons/lucide';
import {
  HlmCardDirective,
  HlmCardContentDirective,
  HlmCardHeaderDirective,
  HlmCardFooterDirective,
  HlmCardDescriptionDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { Social } from '../../interfaces/socials';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { Router } from '@angular/router';
import { TopNavBar } from '../../common/top-nav-bar/top-nav-bar';
import { Auth, User, user } from '@angular/fire/auth';

@Component({
  selector: 'app-home-screen',
  imports: [
    NgIcon,
    HlmIconDirective,
    HlmCardDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmCardHeaderDirective,
    HlmCardDescriptionDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    TopNavBar,
  ],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.scss',
  providers: [
    provideIcons({
      lucideFilePlus2,
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
    }),
  ],
})
export class HomeScreen extends BasePageScreen implements OnInit {
  constructor(private router: Router) {
    super();
  }

  private auth = inject(Auth);

  public gUser: User | null = null;

  ngOnInit(): void {
    user(this.auth).subscribe((currentUser) => {
      this.gUser = currentUser;
    });
    if (this.gUser === null) {
      //TODO:
    }
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
      route: 'social-links',
    },
    {
      type: 'portfolio',
      icon: 'lucideFilePlus2',
      desc: 'Website made for you to show off your talents and skills',
      route: 'social-links',
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
      type: 'contact',
      icon: 'lucideMail',
      desc: 'Let people reach out for jobs or freelance work',
      route: 'social-links',
    },
    {
      type: 'qr-code',
      icon: 'lucideQrCode',
      desc: 'Generate a QR code to share your card instantly',
      route: 'social-links',
    },
    {
      type: 'analytics',
      icon: 'lucideChartBar',
      desc: 'See who views your card and profile',
      route: 'social-links',
    },
    {
      type: 'vcard',
      icon: 'lucideDownload',
      desc: 'Let people download your vCard to their phone',
      route: 'social-links',
    },
    {
      type: 'video-intro',
      icon: 'lucideVideo',
      desc: 'Add a quick video introduction to make a personal connection',
      route: 'social-links',
    },
  ];

  public navigateToSocial(route: string) {
    this.router.navigate([route]);
  }
}
