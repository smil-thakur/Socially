import { Component, input } from '@angular/core';
import { SocialLink } from '../../interfaces/social-link';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideFacebook,
  lucideGithub,
  lucideInstagram,
  lucideLinkedin,
  lucideMessageCircle,
  lucideTwitter,
  lucideYoutube,
} from '@ng-icons/lucide';

import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { SocialLinkMainCard } from '../social-link-main-card/social-link-main-card';
import { HlmSkeletonComponent } from '@spartan-ng/helm/skeleton';
@Component({
  selector: 'app-social-link-card',
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    CommonModule,
    NgIconComponent,
    HlmSkeletonComponent,
  ],
  providers: [
    provideIcons({
      lucideLinkedin,
      lucideMessageCircle,
      lucideTwitter,
      lucideFacebook,
      lucideInstagram,
      lucideGithub,
      lucideYoutube,
    }),
  ],
  templateUrl: './social-link-card.html',
  styleUrl: './social-link-card.scss',
})
export class SocialLinkCard {
  constructor(private hlmDialogService: HlmDialogService) {}
  public socialLink = input.required<SocialLink>();
  tinyImageLoaded = false;

  public onTinyImageLoad(): void {
    this.tinyImageLoaded = true;
  }

  // List of Lucide icons provided via provideIcons
  lucideIcons = [
    'lucideLinkedin',
    'lucideMessageCircle',
    'lucideTwitter',
    'lucideFacebook',
    'lucideInstagram',
    'lucideGithub',
    'lucideYoutube',
  ];

  frostX = '50%';
  frostY = '50%';

  onFrostMove(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.frostX = `${x}%`;
    this.frostY = `${y}%`;
  }

  resetFrost() {
    this.frostX = '50%';
    this.frostY = '50%';
  }

  public openMainCard() {
    const dialogRef = this.hlmDialogService.open(SocialLinkMainCard, {
      context: this.socialLink(),
      contentClass: 'social-link-main-card',
    });
  }
}
