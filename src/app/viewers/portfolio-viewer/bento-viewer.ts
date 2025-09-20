import {
  Component,
  input,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ElementRef,
  OnDestroy,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { Website } from '../../interfaces/website';
import { ActivatedRoute } from '@angular/router';
import { PreloaderService } from '../../services/preloader-service';
import { APIservice } from '../../services/apiservice';
import { API } from '../../enums/APIenums';
import { UserService } from '../../services/user-service';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ErrorDialog } from '../../common/error-dialog/error-dialog';

@Component({
  selector: 'app-bento-viewer',
  imports: [],
  templateUrl: './bento-viewer.html',
  styleUrl: './bento-viewer.scss',
})
export class BentoViewer implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('bentoGrid', { static: false })
  bentoGrid!: ElementRef<HTMLDivElement>;
  private route = inject(ActivatedRoute);
  private email!: string;
  private preloaderService = inject(PreloaderService);
  private apiService = inject(APIservice);
  private userService = inject(UserService);
  private hlmDialogService = inject(HlmDialogService);

  website = input<Website>();
  private resizeTimeout?: number;

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.email = params.get('email')!;
      this.loadWebsiteByEmail();
    });
  }

  ngAfterViewInit() {
    // Check if CSS masonry is supported
    if (!CSS.supports('grid-template-rows', 'masonry')) {
      this.initMasonryFallback();
    }
  }

  ngOnDestroy() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Debounce resize events
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = window.setTimeout(() => {
      if (!CSS.supports('grid-template-rows', 'masonry')) {
        this.initMasonryFallback();
      }
    }, 250);
  }

  private initMasonryFallback() {
    // Simple masonry fallback using JavaScript
    setTimeout(() => {
      if (this.bentoGrid) {
        const grid = this.bentoGrid.nativeElement;
        const items = Array.from(grid.children) as HTMLElement[];

        // Reset positioning
        items.forEach((item) => {
          item.style.position = 'static';
          item.style.top = 'auto';
          item.style.left = 'auto';
        });

        // Simple column-based masonry
        const columns = this.getColumnCount();
        const columnHeights = new Array(columns).fill(0);
        const gap = 16;

        items.forEach((item) => {
          const shortestColumn = columnHeights.indexOf(
            Math.min(...columnHeights)
          );
          const itemHeight = item.offsetHeight;

          item.style.position = 'absolute';
          item.style.top = `${columnHeights[shortestColumn]}px`;
          item.style.left = `${shortestColumn * (100 / columns)}%`;
          item.style.width = `${100 / columns - 1}%`;

          columnHeights[shortestColumn] += itemHeight + gap;
        });

        // Set container height
        grid.style.height = `${Math.max(...columnHeights)}px`;
        grid.style.position = 'relative';
      }
    }, 100);
  }

  private getColumnCount(): number {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 900) return 3;
    if (width >= 600) return 2;
    return 1;
  }

  private async loadWebsiteByEmail() {
    if (!this.email) return;

    try {
      this.preloaderService.show();
      this.website = await this.apiService.get(
        API.GET_WEBSITE_FROM_EMAIL,
        { email: this.email },
        await this.userService.getCurrentUserObject().getIdToken()
      );
      console.log('Website loaded for email:', this.email, this.website);
    } catch (err) {
      this.hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'Unable to load website',
          desc: err,
        },
      });
    } finally {
      this.preloaderService.hide();
    }
  }
}
