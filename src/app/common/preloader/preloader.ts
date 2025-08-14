import { Component, inject } from '@angular/core';
import { PreloaderService } from '../../services/preloader-service';
import { CommonModule } from '@angular/common';
import { HlmSpinner } from '@spartan-ng/helm/spinner';

@Component({
  selector: 'app-preloader',
  imports: [CommonModule, HlmSpinner],
  templateUrl: './preloader.html',
  styleUrl: './preloader.scss',
})
export class Preloader {
  public preloaderService = inject(PreloaderService);
}
