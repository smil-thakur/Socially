import { Component, DOCUMENT, Inject, OnInit, Renderer2 } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSun, lucideMoon } from '@ng-icons/lucide';
import { LocalStorageService } from '../../services/local-storage-service';
import { ToggleThemeService } from '../../services/toggle-theme-service';

@Component({
  selector: 'app-theme-toggle',
  imports: [HlmButton, HlmIcon, NgIcon],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
  providers: [provideIcons({ lucideSun, lucideMoon })],
})
export class ThemeToggle implements OnInit {
  public toggleIcon = 'lucideSun';
  constructor(private themeService: ToggleThemeService) {}
  public updateToggleIcon() {
    if (this.themeService.getCurrentMode() == 'dark') {
      this.toggleIcon = 'lucideSun';
    } else {
      this.toggleIcon = 'lucideMoon';
    }
  }
  ngOnInit(): void {
    this.updateToggleIcon();
  }
  public toggleTheme() {
    this.themeService.toggleMode();
    this.updateToggleIcon();
  }
}
