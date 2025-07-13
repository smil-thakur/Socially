import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { SocialLink } from '../../interfaces/social-link';
import { CommonModule } from '@angular/common';
import { HlmSkeletonComponent } from '@spartan-ng/helm/skeleton';
import { SocialLinkMainCard } from '../../common/social-link-main-card/social-link-main-card';
import { SocialLinkService } from '../../services/social-link-service';
import { PreloaderService } from '../../services/preloader-service';

@Component({
  selector: 'app-social-link-viewer',
  standalone: true,
  imports: [CommonModule, SocialLinkMainCard],
  templateUrl: './social-link-viewer.html',
  styleUrl: './social-link-viewer.scss',
})
export class SocialLinkViewer implements OnInit {
  id!: string;
  socialLinks: SocialLink[] | null = null;
  fetchingLinks: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private socialLinkService: SocialLinkService,
    private preloaderService: PreloaderService
  ) {}

  async fetchSocialLinks(id: string) {
    this.fetchingLinks = true;
    this.preloaderService.show();
    this.socialLinks = await this.socialLinkService.getAllSocialLinksForUser(
      id
    );
    this.preloaderService.hide();
    this.fetchingLinks = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.id = params.get('id')!;
      this.fetchSocialLinks(this.id);
    });
  }
}
