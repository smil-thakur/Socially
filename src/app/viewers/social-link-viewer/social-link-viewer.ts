import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { SocialLink } from '../../interfaces/social-link';
import { CommonModule } from '@angular/common';
import { HlmSkeletonComponent } from '@spartan-ng/helm/skeleton';
import { SocialLinkMainCard } from '../../common/social-link-main-card/social-link-main-card';
import { SocialLinkService } from '../../services/social-link-service';

@Component({
  selector: 'app-social-link-viewer',
  standalone: true,
  imports: [CommonModule, HlmSkeletonComponent, SocialLinkMainCard],
  templateUrl: './social-link-viewer.html',
  styleUrl: './social-link-viewer.scss',
})
export class SocialLinkViewer implements OnInit {
  id!: string;
  socialLinks = signal<SocialLink[] | null>(null);
  loading = signal(true);
  error = signal('');

  constructor(
    private route: ActivatedRoute,
    private socialLinkService: SocialLinkService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.id = params.get('id')!;
      this.loading.set(true);
      this.error.set('');
      try {
        const links = await this.socialLinkService.getAllSocialLinksForUser(
          this.id
        );
        if (!links || links.length === 0) {
          this.error.set('No social links found for this user.');
          this.socialLinks.set([]);
        } else {
          this.socialLinks.set(links);
        }
      } catch (e) {
        this.error.set('Unable to fetch social links.');
        console.log(e);
        this.socialLinks.set([]);
      } finally {
        this.loading.set(false);
      }
    });
  }
}
