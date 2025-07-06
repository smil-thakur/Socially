import { Component, inject } from '@angular/core';
import { PreloaderService } from '../../services/preloader-service';
import { CommonModule } from '@angular/common';
import { HlmSpinnerComponent } from '@spartan-ng/helm/spinner';

@Component({
  selector: 'app-preloader',
  imports: [CommonModule, HlmSpinnerComponent],
  templateUrl: './preloader.html',
  styleUrl: './preloader.scss',
})
export class Preloader {
  public preloaderService = inject(PreloaderService);
}
