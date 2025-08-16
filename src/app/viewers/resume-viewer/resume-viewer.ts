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
import latex from 'monaco-latex';
import { ResumePdfService } from '../../services/resume-pdf-service';
import { ToggleThemeService } from '../../services/toggle-theme-service';
import { HlmButton } from '@spartan-ng/helm/button';
import { BasePageScreen } from '../../common/base-page-screen/base-page-screen';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ErrorDialog } from '../../common/error-dialog/error-dialog';
@Component({
  selector: 'app-resume-viewer',
  imports: [CodeEditorComponent, PdfViewerModule, HlmButton, NgIcon],
  providers: [
    provideIcons({
      lucideArrowLeft,
    }),
  ],
  templateUrl: './resume-viewer.html',
  styleUrl: './resume-viewer.scss',
})
export class ResumeViewer extends BasePageScreen implements OnInit {
  private apiService = inject(APIservice);
  private userCacheManager = inject(UserCacheManager);
  private resumeDataService = inject(ResumeDataService);
  private userService = inject(UserService);
  private preloaderService = inject(PreloaderService);
  private codeService = inject(CodeEditorService);
  private resumePDFService = inject(ResumePdfService);
  private themeService = inject(ToggleThemeService);
  private hlmDialogService = inject(HlmDialogService);

  public username = this.userService.getCurrentUserObject().displayName;
  public latex = '';
  public pdfSource = '';
  public theme =
    this.themeService.getCurrentMode() === 'dark' ? 'vs-dark' : 'vs-light';

  public codeModel: CodeModel = {
    language: 'latex',
    value: '',
    uri: 'resume.tex',
  };

  public codeOption = {
    automaticLayout: true,
  };

  public async getLatex() {
    this.preloaderService.show();
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
    this.codeService.monaco.languages.register({ id: 'latex' });
    this.codeService.monaco.languages.setMonarchTokensProvider('latex', latex);
    this.codeModel = {
      language: 'latex',
      value: this.latex,
      uri: 'resume.tex',
    };
    await this.getPDF();
    this.preloaderService.hide();
  }

  ngOnInit(): void {
    this.getLatex();
  }

  public contentChange(value: any) {
    this.latex = value;
  }

  public async recompilePDF() {
    if (this.latex) {
      await this.getPDF();
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
      }
    }
  }
}
