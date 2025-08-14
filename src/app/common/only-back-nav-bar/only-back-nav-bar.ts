import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-only-back-nav-bar',
  imports: [NgIcon, HlmButton],
  templateUrl: './only-back-nav-bar.html',
  styleUrl: './only-back-nav-bar.scss',
  providers: [
    provideIcons({
      lucideArrowLeft,
    }),
  ],
})
export class OnlyBackNavBar {
  constructor(private location: Location) {}
  public navigateBack() {
    this.location.back();
  }
}
