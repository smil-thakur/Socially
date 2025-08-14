import * as htmlToImage from 'html-to-image';

import { Component, inject, input, OnInit } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { SocialLink } from '../../interfaces/social-link';
import { BasePageScreen } from '../base-page-screen/base-page-screen';
import { popularSocialMediaIcons } from '../../enums/popular-social-media-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideDownload,
  lucideExternalLink,
  lucideFacebook,
  lucideGithub,
  lucideInstagram,
  lucideLinkedin,
  lucideMessageCircle,
  lucideShare2,
  lucideTwitter,
  lucideYoutube,
} from '@ng-icons/lucide';
import { QRCodeComponent } from 'angularx-qrcode';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-social-link-main-card',
  imports: [
    NgIconComponent,
    QRCodeComponent,
    HlmButton,
    HlmTooltipTrigger,
    HlmSkeleton,
    HlmIcon,
  ],
  templateUrl: './social-link-main-card.html',
  styleUrl: './social-link-main-card.scss',
  providers: [
    provideIcons({
      lucideLinkedin,
      lucideMessageCircle,
      lucideTwitter,
      lucideFacebook,
      lucideInstagram,
      lucideGithub,
      lucideYoutube,
      lucideExternalLink,
      lucideShare2,
      lucideDownload,
    }),
  ],
})
export class SocialLinkMainCard extends BasePageScreen implements OnInit {
  socialLinkInput = input<SocialLink>();
  isDialog: boolean = true;
  private dialogRef: BrnDialogRef<SocialLink> | null = null;
  private dialogContext: SocialLink | null = null;

  protected socialLink: SocialLink | undefined;

  constructor() {
    super();
    try {
      this.dialogRef = inject<BrnDialogRef<SocialLink>>(BrnDialogRef);
      this.dialogContext = injectBrnDialogContext<SocialLink>();
      this.socialLink = this.dialogContext;
    } catch (e) {
      console.error('main-card not opened as dialog');
    }
  }

  ngOnInit(): void {
    if (this.socialLinkInput() !== undefined) {
      this.socialLink = this.socialLinkInput();
      this.isDialog = false;
    }
  }

  public customImageLoaded = false;

  popularMediaLucideIcons = popularSocialMediaIcons;

  async shareCardImage() {
    await this.captureAndHandleCardImage('share');
  }
  async downloadCardImage() {
    await this.captureAndHandleCardImage('download');
  }

  onCustomImageLoaded() {
    this.customImageLoaded = true;
  }

  /**
   * Helper to capture the card as an image with background, padding, and high quality
   * @param mode 'share' | 'download'
   */
  private async captureAndHandleCardImage(mode: 'share' | 'download') {
    const card = document.getElementById(`main-card-${this.socialLink!.id}`);
    if (!card) return;

    const computedStyle = window.getComputedStyle(card);
    let cardVar = computedStyle.getPropertyValue('--card').trim();
    let bgColor = '';
    if (cardVar) {
      if (window.CSS && CSS.supports('color', `oklch(${cardVar})`)) {
        bgColor = `oklch(${cardVar})`;
      } else if (window.CSS && CSS.supports('color', `hsl(${cardVar})`)) {
        bgColor = `hsl(${cardVar})`;
      } else {
        bgColor = '#181A20';
      }
    } else {
      bgColor = computedStyle.backgroundColor;
      if (
        !bgColor ||
        bgColor === 'rgba(0, 0, 0, 0)' ||
        bgColor === 'transparent'
      ) {
        bgColor = '#181A20';
      }
    }

    const scale = 3;

    const dataUrl = await htmlToImage.toPng(card, {
      backgroundColor: bgColor,
      cacheBust: true,
      pixelRatio: scale,
      style: {},
    });

    const blob = await (await fetch(dataUrl)).blob();
    if (!blob) return;

    if (mode === 'share') {
      const file = new File([blob], 'social-link-card.png', {
        type: 'image/png',
      });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Social Card',
          text: 'Check out my social profile!',
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'social-link-card.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'social-link-card.png';
      a.click();
      URL.revokeObjectURL(url);
    }
  }
  formatFollowersCount(count: number | string | null | undefined): string {
    if (count === null || count === undefined || count === '') return '';
    const num = typeof count === 'string' ? parseInt(count, 10) : count;
    if (isNaN(num)) return '';
    if (num >= 1_000_000_000)
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'b+';
    if (num >= 10_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm+';
    if (num >= 100_000)
      return (num / 100_000).toFixed(1).replace(/\.0$/, '') + 'lkh+';
    if (num >= 1_000)
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k+';
    return num.toString();
  }
  get qrCodeWidth(): number {
    return window.innerWidth < 640 ? 90 : 150;
  }
}
