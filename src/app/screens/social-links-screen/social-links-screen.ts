import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
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
import { BasePageScreen } from '../../common/base-page-screen/base-page-screen';
import { popularSocialMediaPlatforms } from '../../enums/popular-social-media-platforms';
import { POPULAR_SOCIAL_MEDIA_BASE_URLS } from '../../enums/popular-social-medial-base-url';
import { PreloaderService } from '../../services/preloader-service';
import { UserService } from '../../services/user-service';
import { v4 as uuidv4 } from 'uuid';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ErrorDialog } from '../../common/error-dialog/error-dialog';
import { InfoDialog } from '../../common/info-dialog/info-dialog';
import { SocialLinkService } from '../../services/social-link-service';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/helm/tabs';
import { SocialLinkGreeting } from '../../interfaces/social-link-greeting';

@Component({
  selector: 'app-social-links-screen',
  standalone: true,
  imports: [
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,

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
export class SocialLinksScreen
  extends BasePageScreen
  implements OnInit, OnDestroy
{
  newLinkForm: FormGroup | null = null;
  greetingsForm: FormGroup | null = null;
  layout: 'card' | 'pill' | 'icon' = 'card';
  socialLinks: SocialLink[] = [];
  customIcon: string = '';
  customIconFile: File | null = null;
  platforms = popularSocialMediaPlatforms;

  private platformValueChangeSubscription: Subscription | undefined;
  private profileURLChangeSubscription: Subscription | undefined;
  private userService = inject(UserService);
  private readonly _hlmDialogService = inject(HlmDialogService);
  private socialLinkGreetCloud: SocialLinkGreeting | null = null;

  constructor(
    private fb: FormBuilder,
    private preloaderService: PreloaderService,
    private socialLinkService: SocialLinkService
  ) {
    super();
  }

  async fetchSocialLinks() {
    this.preloaderService.show();
    this.socialLinks = await this.socialLinkService.getAllSocialLinksForUser(
      this.userService.getCurrentUserObject().uid
    );
    this.socialLinkGreetCloud =
      await this.socialLinkService.getSocialLinkGreeting(
        this.userService.getCurrentUserObject().uid
      );
    if (this.greetingsForm) {
      this.greetingsForm
        .get('title')
        ?.setValue(this.socialLinkGreetCloud?.title);
      this.greetingsForm.get('body')?.setValue(this.socialLinkGreetCloud?.body);
    }
    this.preloaderService.hide();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.greetingsForm = this.fb.group({
      title: new FormControl(
        {
          value: null,
          disabled: false,
        },
        [Validators.maxLength(50), Validators.required]
      ),
      body: new FormControl(
        {
          value: null,
          disabled: false,
        },
        [Validators.maxLength(256), Validators.required]
      ),
    });
    this.newLinkForm = this.fb.group({
      url: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      customPlatformName: new FormControl(
        {
          value: null,
          disabled: false,
        },
        [Validators.maxLength(20), Validators.required]
      ),

      username: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      handle: new FormControl({ value: '', disabled: false }, [
        Validators.maxLength(30),
      ]),
      follower: new FormControl({ value: '', disabled: false }, [
        Validators.max(999999999),
        Validators.pattern(/^[0-9]+$/),
      ]),
      following: new FormControl({ value: '', disabled: false }, [
        Validators.max(999999999),
        Validators.pattern(/^[0-9]+$/),
      ]),
      bio: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.maxLength(160),
      ]),
      platform: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      color: new FormControl({ value: '#666666', disabled: true }),
    });
    this.platformValueChangeSubscription = this.newLinkForm
      .get('platform')
      ?.valueChanges.subscribe((newValue) => {
        this.onPlatformChange(newValue);
      });
    this.profileURLChangeSubscription = this.newLinkForm
      .get('url')
      ?.valueChanges.subscribe((newURL) => {
        this.onProfileURLChange(newURL);
      });
    this.fetchSocialLinks();
  }

  ngOnDestroy(): void {
    if (this.platformValueChangeSubscription) {
      this.platformValueChangeSubscription.unsubscribe();
    }
    if (this.profileURLChangeSubscription) {
      this.profileURLChangeSubscription.unsubscribe();
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

  get followers() {
    return this.newLinkForm?.get('follower');
  }

  get following() {
    return this.newLinkForm?.get('following');
  }

  get customPlatformName() {
    return this.newLinkForm?.get('customPlatformName');
  }

  get username() {
    return this.newLinkForm?.get('username');
  }

  get bio() {
    return this.newLinkForm?.get('bio');
  }

  get handle() {
    return this.newLinkForm?.get('handle');
  }

  onProfileURLChange(value: string) {
    if (value) {
      const match = POPULAR_SOCIAL_MEDIA_BASE_URLS.find((item) =>
        value.includes(item.baseURL)
      );
      if (match) {
        const socialMediaValue = match.value;
        this.platform?.enable();
        this.platform?.setValue(socialMediaValue);
      } else {
        this.platform?.setValue('custom');
      }
    }
  }

  onPlatformChange(newPlatform: string) {
    const platformValue = newPlatform;
    if (platformValue && platformValue !== 'custom') {
      this.newLinkForm?.get('color')?.disable();
      const platform = this.platforms.find((p) => p.value === platformValue);
      this.color?.setValue(platform ? platform.color : '#666666');
      this.customIcon = '';
      this.customPlatformName?.setValidators(null);
      this.customPlatformName?.updateValueAndValidity();
    } else if (platformValue === 'custom') {
      this.newLinkForm?.get('color')?.enable();
      this.color?.setValue('#666666');

      this.customPlatformName?.setValidators([
        Validators.required,
        Validators.maxLength(20),
      ]);
      this.customPlatformName?.updateValueAndValidity();
    }
  }

  onIconUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this._hlmDialogService.open(InfoDialog, {
          context: {
            info: 'Icon file size must be less than 5MB.',
            desc: 'File size limit',
          },
        });
        return;
      }
      this.customIconFile = file;
    }
  }

  async addGreetings() {
    if (!this.greetingsForm) return;
    this.greetingsForm.markAllAsTouched();
    if (this.greetingsForm.invalid) return;
    this.preloaderService.show();
    try {
      const socialLinkGreet: SocialLinkGreeting = {
        title: this.greetingsForm.get('title')?.value,
        body: this.greetingsForm.get('body')?.value,
      };
      await this.socialLinkService.addSocialLinkGreeting(
        this.userService.getCurrentUserObject().uid,
        socialLinkGreet
      );
      this.preloaderService.hide();
      this.greetingsForm.reset({
        title: socialLinkGreet.title,
        body: socialLinkGreet.body,
      });
      console.log('opening dialog');
      this._hlmDialogService.open(InfoDialog, {
        context: {
          info: 'Greeting Updated',
          desc: 'Check your view page to see updated greeting',
        },
      });
    } catch (err) {
      this.preloaderService.hide();
      this._hlmDialogService.open(ErrorDialog, {
        context: {
          error: (err as any)?.message || 'Unknown error',
          desc: 'Problem while adding greeting',
        },
      });
    }
  }

  async addSocialLink() {
    if (!this.newLinkForm) return;
    this.newLinkForm.markAllAsTouched();
    if (this.newLinkForm.invalid) return;
    if (!this.url?.value || !this.platform?.value) return;
    const platform = this.platforms.find(
      (p) => p.value === this.platform?.value
    );
    let customIconUrl = '';
    try {
      this.preloaderService.show();
      if (this.platform.value === 'custom' && this.customIconFile) {
        customIconUrl = await this.socialLinkService.uploadIconAndGetUrl(
          this.userService.getCurrentUserObject().uid,
          this.customIconFile
        );
      }
      const link: SocialLink = {
        id: uuidv4(),
        url: this.url.value,
        username: this.username?.value,
        platform: this.platform.value,
        platformName: platform
          ? this.platform.value === 'custom'
            ? this.customPlatformName?.value
            : platform.value
          : 'Custom',
        icon: platform ? platform.icon : '',
        color: this.color?.value || (platform ? platform.color : '#666666'),
        customIcon: this.platform.value === 'custom' ? customIconUrl : '',
        followers: this.followers?.value,
        following: this.following?.value,
        desc: this.bio?.value,
        handle: this.handle?.value,
      };
      this.socialLinks.push(link);
      this.newLinkForm.reset({
        color: '#666666',
      });
      this.platform.disable();
      this.customIcon = '';
      this.customIconFile = null;
      await this.socialLinkService.addSocialLinkForUser(
        this.userService.getCurrentUserObject().uid,
        link
      );
      this.preloaderService.hide();
    } catch (error) {
      this.preloaderService.hide();
      this._hlmDialogService.open(ErrorDialog, {
        context: {
          error: (error as any)?.message || 'Unknown error',
          desc: 'Problem while adding social link',
        },
      });
    }
  }
}
