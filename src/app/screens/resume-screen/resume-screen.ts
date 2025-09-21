import { Component, inject, OnInit } from '@angular/core';
import { APIservice } from '../../services/apiservice';
import { API } from '../../enums/APIenums';
import { UserCacheManager } from '../../cache/user-cache-manager';
import { ResumeData } from '../../interfaces/ResumeData';
import { ResumeDataService } from '../../services/resume-data-service';
import { UserService } from '../../services/user-service';
import { PreloaderService } from '../../services/preloader-service';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import {
  CodeEditorComponent,
  CodeModel,
  CodeEditorService,
} from '@ngstack/code-editor';
import { ResumePdfService } from '../../services/resume-pdf-service';
import { ToggleThemeService } from '../../services/toggle-theme-service';
import { HlmButton } from '@spartan-ng/helm/button';
import { BasePageScreen } from '../../common/base-page-screen/base-page-screen';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ErrorDialog } from '../../common/error-dialog/error-dialog';
import { InfoDialog } from '../../common/info-dialog/info-dialog';
import { Title } from '@angular/platform-browser';
import { ConfirmationDialog } from '../../common/confirmation-dialog/confirmation-dialog';
import { Location } from '@angular/common';
import { toast } from 'ngx-sonner';
import { HlmToaster } from '@spartan-ng/helm/sonner';
import { isEqual } from 'lodash';
@Component({
  selector: 'app-resume-screen',
  imports: [
    CodeEditorComponent,
    PdfViewerModule,
    HlmButton,
    NgIcon,
    HlmToaster,
  ],
  providers: [
    provideIcons({
      lucideArrowLeft,
    }),
  ],
  templateUrl: './resume-screen.html',
  styleUrl: './resume-screen.scss',
})
export class ResumeScreen extends BasePageScreen implements OnInit {
  private apiService = inject(APIservice);
  private userCacheManager = inject(UserCacheManager);
  private resumeDataService = inject(ResumeDataService);
  private userService = inject(UserService);
  private preloaderService = inject(PreloaderService);
  private codeService = inject(CodeEditorService);
  private resumePDFService = inject(ResumePdfService);
  private themeService = inject(ToggleThemeService);
  private hlmDialogService = inject(HlmDialogService);
  private location = inject(Location);

  public username = this.userService.getCurrentUserObject().displayName;
  public latex = '';
  public pdfSource = '';
  public theme =
    this.themeService.getCurrentMode() === 'dark' ? 'vs-dark' : 'vs-light';
  public isPDFSaved = false;
  public pdfContainsError = false;
  public texURL = '';
  public initialTex = '';

  public codeModel: CodeModel = {
    language: 'latex',
    value: '',
    uri: 'resume.tex',
  };

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

  public async getLatex() {
    this.preloaderService.show();
    try {
      const saveTex = await this.resumePDFService.getSaveTexContent();
      this.latex = saveTex!;
      this.isPDFSaved = true;
      this.initialTex = this.latex;
    } catch (err) {
      toast('No saved Tex found', {
        description:
          'Please save your generated Tex, we were not able to locate any saved Tex',
      });
      try {
        let resumeData: ResumeData | null = null;

        if (this.userCacheManager.getCache()) {
          resumeData = this.userCacheManager.getCache()!;
        } else {
          resumeData = (await this.resumeDataService.getResumeDataFirebase())!;
        }
        if (resumeData === null) {
          this.hlmDialogService
            .open(ErrorDialog, {
              context: {
                error: 'Can not get your profile Details',
                desc: 'Make sure you go to analytics page to check if your profile data is valid and save!',
              },
            })
            .closed$.subscribe(() => {
              this.location.back();
            });
          return;
        }
        this.latex = (
          await this.apiService.post(
            API.GETLATEXFROMUSERPROFILE,
            resumeData,
            await this.userService.getCurrentUserObject().getIdToken()
          )
        )['latex'];
        this.initialTex = this.latex;
      } catch (err) {
        this.hlmDialogService.open(ErrorDialog, {
          context: {
            error: 'Error fetching your data',
            desc: `Internet issue, please try again, after verifying your internet \n ${err}`,
          },
        });
      }
    }

    this.codeModel = {
      language: 'latex',
      value: this.latex,
      uri: 'resume.tex',
    };
    await this.getPDF();
    this.preloaderService.hide();
  }

  public async regeneratePDF() {
    this.preloaderService.show();
    try {
      let resumeData: ResumeData;
      if (this.userCacheManager.getCache()) {
        resumeData = this.userCacheManager.getCache()!;
      } else {
        resumeData = (await this.resumeDataService.getResumeDataFirebase())!;
      }
      this.latex = (
        await this.apiService.post(
          API.GETLATEXFROMUSERPROFILE,
          resumeData,
          await this.userService.getCurrentUserObject().getIdToken()
        )
      )['latex'];
      this.initialTex = this.latex;
      this.codeModel = {
        language: 'latex',
        value: this.latex,
        uri: 'resume.tex',
      };
      await this.getPDF();
      this.isPDFSaved = false;
    } catch (err) {
      this.hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'Error generating PDF',
          desc: `Incorrect syntax or internal issue, please try again, after verifying your latex code ${err}`,
        },
      });
      this.pdfContainsError = true;
    } finally {
      this.preloaderService.hide();
    }
  }

  ngOnInit(): void {
    // Register LaTeX language
    this.codeService.monaco.languages.register({ id: 'latex' });

    // Set up basic LaTeX syntax highlighting
    this.codeService.monaco.languages.setMonarchTokensProvider('latex', {
      tokenizer: {
        root: [
          [/\\[a-zA-Z@]+/, 'keyword'],
          [/\\[^a-zA-Z@]/, 'keyword'],
          [/\{/, 'delimiter.bracket', '@bracket'],
          [/\}/, 'delimiter.bracket', '@pop'],
          [/%/, 'comment', '@comment'],
          [/[^\\{}%]+/, 'text'],
        ],
        bracket: [
          [/\{/, 'delimiter.bracket', '@bracket'],
          [/\}/, 'delimiter.bracket', '@pop'],
          [/[^{}]+/, 'text'],
        ],
        comment: [
          [/$/, 'comment', '@pop'],
          [/.*/, 'comment'],
        ],
      },
    });
    window.scrollTo(0, 0);
    this.getLatex();
  }

  public contentChange(value: any) {
    this.latex = value;
    if (!isEqual(this.latex, this.initialTex)) {
      this.isPDFSaved = false;
    }
  }

  public async recompilePDF() {
    if (this.latex) {
      this.preloaderService.show();
      await this.getPDF();
      this.preloaderService.hide();
    }
  }

  public handleBack() {
    if (!this.isPDFSaved) {
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

  public async savePDF() {
    this.preloaderService.show();
    try {
      this.texURL = await this.resumePDFService.saveTex(this.latex);
      this.isPDFSaved = true;
      this.initialTex = this.latex;
    } catch (err) {
      this.hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'Error saving PDF',
          desc: `Error saving the PDF please check your internet or try again later ${err}`,
        },
      });
    } finally {
      this.preloaderService.hide();
    }
  }

  public async getPDF() {
    if (this.latex) {
      try {
        let res = await this.resumePDFService.generatePDFFromLatex(this.latex);
        this.pdfSource = window.URL.createObjectURL(res);
      } catch (err) {
        this.hlmDialogService.open(ErrorDialog, {
          context: {
            error: 'Error generating PDF',
            desc: `Incorrect syntax or internal issue, please try again, after verifying your latex code ${err}`,
          },
        });
        this.pdfContainsError = true;
      }
    }
  }
}
