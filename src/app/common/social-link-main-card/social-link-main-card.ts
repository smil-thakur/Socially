import html2canvas from 'html2canvas';

import { Component, inject } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { SocialLink } from '../../interfaces/social-link';
import { BasePageScreen } from '../base-page-screen/base-page-screen';
import { popularSocialMediaIcons } from '../../enums/popular-social-media-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideExternalLink,
  lucideFacebook,
  lucideGithub,
  lucideInstagram,
  lucideLinkedin,
  lucideMessageCircle,
  lucideTwitter,
  lucideYoutube,
} from '@ng-icons/lucide';
import { QRCodeComponent } from 'angularx-qrcode';
import { HlmButtonDirective } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-social-link-main-card',
  imports: [NgIconComponent, QRCodeComponent, HlmButtonDirective],
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
    }),
  ],
})
export class SocialLinkMainCard extends BasePageScreen {
  private readonly dialogRef = inject<BrnDialogRef<SocialLink>>(BrnDialogRef);
  private readonly dialogContext = injectBrnDialogContext<SocialLink>();

  protected readonly socialLink = this.dialogContext;

  popularMediaLucideIcons = popularSocialMediaIcons;

  async shareCardImage() {
    await this.captureAndHandleCardImage('share');
  }
  async downloadCardImage() {
    await this.captureAndHandleCardImage('download');
  }

  /**
   * Helper to capture the card as an image with background, padding, and high quality
   * @param mode 'share' | 'download'
   */
  private async captureAndHandleCardImage(mode: 'share' | 'download') {
    const card = document.getElementById('main-card');
    if (!card) return;

    const iconNodes = card.querySelectorAll('ng-icon');
    const swappedIcons: { icon: Element; prevStyle: string }[] = [];
    iconNodes.forEach((iconEl) => {
      const el = iconEl as HTMLElement;
      const prevStyle = el.getAttribute('style') || '';
      el.setAttribute('style', prevStyle + ';margin-top:8px !important;');
      swappedIcons.push({ icon: iconEl, prevStyle });
    });

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

    const padding = 0;

    const canvas = await html2canvas(card, {
      backgroundColor: null,
      scale,
      useCORS: true,
      logging: false,
      removeContainer: true,
    });

    const width = card.offsetWidth * scale;
    const height = card.offsetHeight * scale;
    const paddedCanvas = document.createElement('canvas');
    paddedCanvas.width = width;
    paddedCanvas.height = height;
    const ctx = paddedCanvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    ctx.drawImage(canvas, 0, 0, width, height);

    swappedIcons.forEach(({ icon, prevStyle }) => {
      (icon as HTMLElement).setAttribute('style', prevStyle);
    });

    const blob = await new Promise<Blob | null>((resolve) =>
      paddedCanvas.toBlob(resolve, 'image/png', 0.98)
    );
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
}
