import { Component, inject, OnInit } from '@angular/core';
import { ResumePdfService } from '../../services/resume-pdf-service';
import { ActivatedRoute } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PreloaderService } from '../../services/preloader-service';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ErrorDialog } from '../../common/error-dialog/error-dialog';
import { BasePageScreen } from '../../common/base-page-screen/base-page-screen';
@Component({
  selector: 'app-resume-viewer',
  imports: [PdfViewerModule],
  providers: [],
  templateUrl: './resume-viewer.html',
  styleUrl: './resume-viewer.scss',
})
export class ResumeViewer extends BasePageScreen implements OnInit {
  private resumePDFService = inject(ResumePdfService);
  private route = inject(ActivatedRoute);
  private email!: string;
  public pdfURL = '';
  private preloaderService = inject(PreloaderService);
  private hlmDialogService = inject(HlmDialogService);

  async fetchPDFFromEmail() {
    this.preloaderService.show();
    try {
      const pdfBlob = await this.resumePDFService.getPDFFromEmail(this.email);
      this.pdfURL = window.URL.createObjectURL(pdfBlob);
    } catch (err) {
      this.hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'Unable to find resume of the user',
          desc: 'Check if user is valid or url is correct, or try again later!',
        },
      });
    } finally {
      this.preloaderService.hide();
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.email = params.get('email')!;
      await this.fetchPDFFromEmail();
    });
  }
}
