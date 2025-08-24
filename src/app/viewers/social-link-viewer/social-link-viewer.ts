import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { SocialLink } from '../../interfaces/social-link';
import { CommonModule } from '@angular/common';
import { SocialLinkMainCard } from '../../common/social-link-main-card/social-link-main-card';
import { SocialLinkService } from '../../services/social-link-service';
import { PreloaderService } from '../../services/preloader-service';
import { BasePageScreen } from '../../common/base-page-screen/base-page-screen';
import { StaticTopBar } from '../../common/static-top-bar/static-top-bar';
import { SocialLinkGreeting } from '../../interfaces/social-link-greeting';
import { PromotionFooter } from '../../common/promotion-footer/promotion-footer';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideGrid3x3, lucideLayoutGrid } from '@ng-icons/lucide';
import { HlmCard } from '@spartan-ng/helm/card';
import { SocialLinkCard } from '../../common/social-link-card/social-link-card';
import { UserService } from '../../services/user-service';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ErrorDialog } from '../../common/error-dialog/error-dialog';

@Component({
  selector: 'app-social-link-viewer',
  standalone: true,
  imports: [
    CommonModule,
    SocialLinkMainCard,
    StaticTopBar,
    PromotionFooter,
    HlmTabsImports,
    NgIconComponent,
    HlmCard,
    SocialLinkCard,
  ],
  templateUrl: './social-link-viewer.html',
  styleUrl: './social-link-viewer.scss',
  providers: [
    provideIcons({
      lucideLayoutGrid,
      lucideGrid3x3,
    }),
  ],
})
export class SocialLinkViewer extends BasePageScreen implements OnInit {
  email!: string;
  socialLinks: SocialLink[] | null = null;
  fetchingLinks: boolean = true;
  socialLinkGreet: SocialLinkGreeting | null = null;
  public userNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private socialLinkService: SocialLinkService,
    private preloaderService: PreloaderService,
    private userService: UserService,
    private hlmDialogService: HlmDialogService
  ) {
    super();
  }

  async fetchSocialLinks(email: string) {
    this.fetchingLinks = true;
    this.preloaderService.show();
    let id: string | null = null;
    try {
      id = await this.userService.getUserIdFromEmail(email);
      if (id === null) {
        this.userNotFound = true;
        throw new Error('Unable to find the user!');
      }
      this.socialLinks = await this.socialLinkService.getAllSocialLinksForUser(
        id!
      );
      this.socialLinkGreet = await this.socialLinkService.getSocialLinkGreeting(
        id!
      );
    } catch (err) {
      this.hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'Unable to fetch the user links',
          desc: err,
        },
      });
    }

    this.preloaderService.hide();
    this.fetchingLinks = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.email = params.get('email')!;
      this.fetchSocialLinks(this.email);
    });
  }
}
