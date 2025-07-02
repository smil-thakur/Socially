import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardContentDirective,
  HlmCardTitleDirective,
  HlmCardDescriptionDirective,
  HlmCardFooterDirective,
} from '@spartan-ng/helm/card';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideLinkedin,
  lucideMessageCircle,
  lucideTwitter,
  lucideFacebook,
  lucideInstagram,
  lucideGithub,
  lucideYoutube,
} from '@ng-icons/lucide';
import { HlmSelectImports, HlmSelectModule } from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { Subscription } from 'rxjs';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import { SocialLink } from '../../interfaces/social-link';
import { SocialLinkCard } from '../../common/social-link-card/social-link-card';

@Component({
  selector: 'app-social-links-screen',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmSelectModule,
    HlmInputDirective,
    HlmSelectImports,
    BrnSelectImports,
    HlmLabelDirective,

    HlmButtonDirective,

    NgIconComponent,

    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardContentDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardFooterDirective,

    SocialLinkCard,

    CommonModule,
  ],
  templateUrl: './social-links-screen.html',
  styleUrl: './social-links-screen.scss',
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
})
export class SocialLinksScreen implements OnInit, OnDestroy {
  newLinkForm: FormGroup | null = null;
  layout: 'card' | 'pill' | 'icon' = 'card';
  socialLinks: SocialLink[] = [
    {
      url: 'https://linkedin.com/in/example',
      platform: 'linkedin',
      platformName: 'LinkedIn',
      icon: 'lucideLinkedin',
      color: '#0077b5',
      customIcon: '',
    },
    {
      url: 'https://wa.me/1234567890',
      platform: 'whatsapp',
      platformName: 'WhatsApp',
      icon: 'lucideMessageCircle',
      color: '#25d366',
      customIcon: '',
    },
    {
      url: 'https://x.com/SmilThakur',
      platform: 'twitter',
      platformName: 'Twitter',
      icon: 'lucideTwitter',
      color: '#1da1f2',
      customIcon: '',
      desc: 'you know who I am',
      followers: '25',
      following: '62',
    },
    {
      url: 'https://github.com/example',
      platform: 'github',
      platformName: 'GitHub',
      icon: 'lucideGithub',
      color: '#333',
      customIcon: '',
    },
    {
      url: 'https://youtube.com/example',
      platform: 'youtube',
      platformName: 'Youtube',
      icon: 'lucideYoutube',
      color: '#ff0000',
      customIcon: '',
    },
    {
      url: 'https://custom.com/myprofile',
      platform: 'custom',
      platformName: 'Custom',
      icon: '',
      color: '#ff8800',
      customIcon: 'https://placehold.co/32x32/orange/white?text=C',
    },
  ];
  customIcon: string = '';
  platforms = [
    {
      value: 'linkedin',
      label: 'LinkedIn',
      icon: 'lucideLinkedin',
      color: '#0077b5',
    },
    {
      value: 'whatsapp',
      label: 'WhatsApp',
      icon: 'lucideMessageCircle',
      color: '#25d366',
    },
    {
      value: 'twitter',
      label: 'Twitter',
      icon: 'lucideTwitter',
      color: '#1da1f2',
    },
    {
      value: 'facebook',
      label: 'Facebook',
      icon: 'lucideFacebook',
      color: '#1877f3',
    },
    {
      value: 'instagram',
      label: 'Instagram',
      icon: 'lucideInstagram',
      color: '#e1306c',
    },
    { value: 'github', label: 'GitHub', icon: 'lucideGithub', color: '#333' },
    {
      value: 'youtube',
      label: 'YouTube',
      icon: 'lucideYoutube',
      color: '#ff0000',
    },
    {
      value: 'custom',
      label: 'Custom',
      icon: '',
      color: '',
    },
  ];

  private platformValueChangeSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.newLinkForm = this.fb.group({
      url: [''],
      platform: [''],
      color: new FormControl({ value: '', disabled: true }),
    });
    this.platformValueChangeSubscription = this.newLinkForm
      .get('platform')
      ?.valueChanges.subscribe((newValue) => {
        this.onPlatformChange(newValue);
      });
  }

  ngOnDestroy(): void {
    if (this.platformValueChangeSubscription) {
      this.platformValueChangeSubscription.unsubscribe();
    }
  }

  get url() {
    return this.newLinkForm?.get('url');
  }
  get platform() {
    return this.newLinkForm?.get('platform');
  }
  get color() {
    return this.newLinkForm?.get('color');
  }

  onPlatformChange(newPlatform: string) {
    const platformValue = newPlatform;
    console.log(platformValue);
    if (platformValue && platformValue !== 'custom') {
      this.newLinkForm?.get('color')?.disable();
      const platform = this.platforms.find((p) => p.value === platformValue);
      this.color?.setValue(platform ? platform.color : '#666');
      this.customIcon = '';
    } else if (platformValue === 'custom') {
      this.newLinkForm?.get('color')?.enable();
      this.color?.setValue('#666');
    }
  }

  onIconUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.customIcon = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addSocialLink() {
    if (!this.url?.value || !this.platform?.value) return;
    const platform = this.platforms.find(
      (p) => p.value === this.platform?.value
    );
    const link = {
      url: this.url.value,
      platform: this.platform.value,
      platformName: platform ? platform.label : 'Custom',
      icon: platform ? platform.icon : '',
      color: this.color?.value || (platform ? platform.color : '#666'),
      customIcon: this.platform.value === 'custom' ? this.customIcon : '',
    };
    this.socialLinks.push(link);
    this.newLinkForm?.reset({ url: '', platform: '', color: '#666' });
    this.customIcon = '';
  }
}
