import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-only-back-nav-bar',
  imports: [HlmIconDirective, NgIcon, HlmButtonDirective],
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
