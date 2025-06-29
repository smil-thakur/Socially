import { Component } from '@angular/core';
import { hlmMuted, hlmH3, hlmH1 } from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-base-page-screen',
  imports: [],
  templateUrl: './base-page-screen.html',
  styleUrl: './base-page-screen.scss',
})
export class BasePageScreen {
  public mutedStyle = hlmMuted;
  public h3Style = hlmH3;
  public h1Style = hlmH1;
}
