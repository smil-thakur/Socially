import { Component } from '@angular/core';
import { hlmMuted, hlmH3 } from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-base-page-screen',
  imports: [],
  templateUrl: './base-page-screen.html',
  styleUrl: './base-page-screen.scss',
})
export class BasePageScreen {
  public mutedStyle = hlmMuted;
  public h3Style = hlmH3;
}
