import { Component, inject, OnInit } from '@angular/core';
import { OnlyBackNavBar } from '../../common/only-back-nav-bar/only-back-nav-bar';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { StyleCard } from '../../common/style-card/style-card';
import { HlmLabel } from '@spartan-ng/helm/label';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { HlmError } from '@spartan-ng/helm/form-field';
import { APIservice } from '../../services/apiservice';
import { Website } from '../../interfaces/website';
import { API } from '../../enums/APIenums';
import { UserService } from '../../services/user-service';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ErrorDialog } from '../../common/error-dialog/error-dialog';
import { PreloaderService } from '../../services/preloader-service';
import { BentoViewer } from '../../viewers/portfolio-viewer/bento-viewer';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ConfirmationDialog } from '../../common/confirmation-dialog/confirmation-dialog';
import { Location } from '@angular/common';
import { lucideArrowLeft } from '@ng-icons/lucide';

@Component({
  selector: 'app-bento-screen',
  imports: [
    HlmButton,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    NgIcon,
    BentoViewer,
  ],
  providers: [
    provideIcons({
      lucideArrowLeft,
    }),
  ],
  templateUrl: './bento-screen.html',
  styleUrl: './bento-screen.scss',
})
export class BentoScreen implements OnInit {
  public colorArray: string[] = [];
  public website: Website | null = null;
  private apiService = inject(APIservice);
  private userService = inject(UserService);
  private hlmDialogService = inject(HlmDialogService);
  private preloaderService = inject(PreloaderService);
  private location = inject(Location);
  public isBentoSaved = false;
  public isWebsiteGenerated = false;
  public minimalColor = [
    '#007BFF',
    '#FF6B6B',
    '#4CAF50',
    '#FFC107',
    '#00BCD4',
    '#6C757D',
    '#9C27B0',
  ];
  retroColors = ['#FF6B6B', '#FFC107', '#9C27B0', '#FF5722', '#795548'];
  modernColors = ['#007BFF', '#00BCD4', '#4CAF50', '#03A9F4', '#E91E63'];
  professionalColors = ['#007BFF', '#6C757D', '#4CAF50', '#343A40', '#212529'];
  public username = this.userService.getCurrentUserObject().displayName;

  ngOnInit(): void {
    this.loadSavedBento();
  }

  public handleBack() {
    if (!this.isBentoSaved) {
      const dialogref = this.hlmDialogService.open(ConfirmationDialog, {
        context: {
          title: 'Your Resume is not saved!',
          desc: 'Your resume pdf is not saved on cloud navigating back will cause in loss of data!, do you confirm to discard the data?',
        },
      });
      dialogref.closed$.subscribe((response) => {
        if (response === 'yes') {
          this.location.back();
        } else {
          return;
        }
      });
    } else {
      this.location.back();
    }
  }

  public async buildIt() {
    try {
      this.preloaderService.show();
      this.website = await this.apiService.get(
        API.GET_BENTO_FROM_PORTFOLIO_DATA,
        null,
        await this.userService.getCurrentUserObject().getIdToken()
      );
      console.log(this.website);
      localStorage.setItem('website', JSON.stringify(this.website));
      this.isWebsiteGenerated = true;
      this.isBentoSaved = false; // Reset saved status when regenerating
    } catch (err) {
      this.hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'Unable to generate the website',
          desc: err,
        },
      });
    } finally {
      this.preloaderService.hide();
    }
  }

  public async regenerateBento() {
    try {
      this.preloaderService.show();
      this.website = await this.apiService.get(
        API.GET_BENTO_FROM_PORTFOLIO_DATA,
        null,
        await this.userService.getCurrentUserObject().getIdToken()
      );
      console.log('Website regenerated:', this.website);
      localStorage.setItem('website', JSON.stringify(this.website));
      this.isWebsiteGenerated = true;
      this.isBentoSaved = false; // Reset saved status when regenerating
    } catch (err) {
      this.hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'Unable to regenerate the website',
          desc: err,
        },
      });
    } finally {
      this.preloaderService.hide();
    }
  }

  public async compileWebsite() {
    if (!this.website) {
      this.hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'No website to compile',
          desc: 'Please generate a website first',
        },
      });
      return;
    }

    try {
      this.preloaderService.show();
      // For now, compilation just refreshes the view
      // In the future, this could generate static HTML or other formats
      console.log('Website compiled successfully');
      // You could add actual compilation logic here
    } catch (err) {
      this.hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'Unable to compile the website',
          desc: err,
        },
      });
    } finally {
      this.preloaderService.hide();
    }
  }

  public async saveBento() {
    if (!this.website) {
      this.hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'No website to save',
          desc: 'Please generate a website first',
        },
      });
      return;
    }

    try {
      this.preloaderService.show();
      await this.apiService.post(
        API.SAVE_WEBSITE,
        this.website,
        await this.userService.getCurrentUserObject().getIdToken()
      );
      this.isBentoSaved = true;
      console.log('Website saved successfully');
    } catch (err) {
      this.hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'Unable to save the website',
          desc: err,
        },
      });
    } finally {
      this.preloaderService.hide();
    }
  }

  public async loadSavedBento() {
    try {
      this.preloaderService.show();
      this.website = await this.apiService.get(
        API.GET_SAVED_WEBSITE,
        null,
        await this.userService.getCurrentUserObject().getIdToken()
      );
      console.log('Saved website loaded:', this.website);
      localStorage.setItem('website', JSON.stringify(this.website));
      this.isWebsiteGenerated = true;
      this.isBentoSaved = true;
    } catch (err) {
      // Don't show error dialog on init if no saved website exists
      console.log('No saved website found, user can generate a new one');
    } finally {
      this.preloaderService.hide();
    }
  }
}
