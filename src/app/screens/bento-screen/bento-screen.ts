import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { OnlyBackNavBar } from '../../common/only-back-nav-bar/only-back-nav-bar';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { StyleCard } from '../../common/style-card/style-card';
import { HlmLabel } from '@spartan-ng/helm/label';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
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
import { BentoViewer } from '../../viewers/bento-viewer/bento-viewer';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ConfirmationDialog } from '../../common/confirmation-dialog/confirmation-dialog';
import { Location } from '@angular/common';
import { lucideArrowLeft, lucideChevronDown } from '@ng-icons/lucide';
import {
  CodeModel,
  CodeEditorComponent,
  CodeEditorService,
} from '@ngstack/code-editor';
import { BasePageScreen } from '../../common/base-page-screen/base-page-screen';
import { ToggleThemeService } from '../../services/toggle-theme-service';
import { toast } from 'ngx-sonner';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-bento-screen',
  imports: [
    HlmButton,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    HlmAccordionImports,
    NgIcon,
    BentoViewer,
    CodeEditorComponent,
  ],
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideChevronDown,
    }),
  ],
  templateUrl: './bento-screen.html',
  styleUrl: './bento-screen.scss',
})
export class BentoScreen extends BasePageScreen implements OnInit {
  public colorArray: string[] = [];
  public website: Website | null = null;
  private apiService = inject(APIservice);
  private userService = inject(UserService);
  public initialValue: Website | null = null;
  private hlmDialogService = inject(HlmDialogService);
  private preloaderService = inject(PreloaderService);
  private location = inject(Location);
  private themeService = inject(ToggleThemeService);
  public isBentoSaved = false;
  public isWebsiteGenerated = false;
  private codeService = inject(CodeEditorService);

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
  public codeModel: CodeModel = {
    language: 'json',
    value: '',
    uri: 'bento.json',
  };
  public theme =
    this.themeService.getCurrentMode() === 'dark' ? 'vs-dark' : 'vs-light';
  public codeOption = {
    automaticLayout: true,
    wordWrap: 'on' as const,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'on' as const,
    folding: true,
    bracketPairColorization: { enabled: true },
    suggest: {
      showKeywords: true,
      showSnippets: true,
    },
  };

  async ngOnInit(): Promise<void> {
    this.codeService.monaco.languages.register({ id: 'json' });
    this.codeService.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      schemas: [
        {
          uri: 'http://bento-schema.json',
          fileMatch: ['*'],
          schema: this.bentoSchema,
        },
      ],
    });
    await this.loadSavedBento();
  }

  bentoSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Website',
    type: 'object',
    properties: {
      elements: {
        type: 'array',
        items: { $ref: '#/definitions/Bento' },
      },
    },
    required: ['elements'],
    definitions: {
      InnerBento: {
        type: 'object',
        properties: {
          heading: { type: 'string' },
          content: { type: ['string', 'null'] },
          icon: { type: ['string', 'null'] },
          badge: { type: ['string', 'null'] },
          link: { type: ['string', 'null'], format: 'uri' },
        },
        required: ['heading'],
      },
      Bento: {
        type: 'object',
        properties: {
          heading: { type: 'string' },
          content: { type: 'string' },
          innerBentos: {
            type: ['array', 'null'],
            items: { $ref: '#/definitions/InnerBento' },
          },
          bigBento: { type: ['boolean', 'null'] },
          layout: {
            type: ['string', 'null'],
            enum: [
              'default',
              'featured',
              'stats',
              'timeline',
              'gallery',
              'contact',
              null,
            ],
          },
          size: {
            type: ['string', 'null'],
            enum: ['small', 'medium', 'large', 'xl', null],
          },
          accent: {
            type: ['string', 'null'],
            enum: ['primary', 'secondary', 'success', 'warning', 'info', null],
          },
          icon: { type: ['string', 'null'] },
          image: { type: ['string', 'null'], format: 'uri' },
          tags: {
            type: ['array', 'null'],
            items: { type: 'string' },
          },
          stats: {
            type: ['array', 'null'],
            items: {
              type: 'object',
              properties: {
                label: { type: 'string' },
                value: { type: 'string' },
              },
              required: ['label', 'value'],
            },
          },
          badge: { type: ['string', 'null'] },
        },
        required: ['heading', 'content'],
      },
    },
  };

  public contentChange(value: any) {
    try {
      this.website = JSON.parse(value);
      if (!isEqual(this.website, this.initialValue)) {
        this.isBentoSaved = false;
      } else {
        this.isBentoSaved = true;
      }
    } catch (err) {
      toast.error('Please correct syntax error');
    }
  }
  public handleBack() {
    if (!this.isBentoSaved) {
      const dialogref = this.hlmDialogService.open(ConfirmationDialog, {
        context: {
          title: 'Your Bento is not saved!',
          desc: 'Your Bento pdf is not saved on cloud navigating back will cause in loss of data!, do you confirm to discard the data?',
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
      this.codeModel = {
        language: 'json',
        value: JSON.stringify(this.website, null, 2),
        uri: 'bento.json',
      };
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
        API.SAVE_BENTO,
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
        API.GET_BENTO_FROM_EMAIL,
        {
          email: this.userService.getCurrentUserObject().email,
        },
        null
      );
      this.codeModel = {
        language: 'json',
        value: JSON.stringify(this.website, null, 2),
        uri: 'bento.json',
      };
      this.isWebsiteGenerated = true;
      this.isBentoSaved = true;
      this.initialValue = this.website;
    } catch (err) {
      // Don't show error dialog on init if no saved website exists
      console.log('No saved website found, user can generate a new one');
    } finally {
      this.preloaderService.hide();
    }
  }
}
