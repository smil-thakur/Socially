import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggle } from './common/theme-toggle/theme-toggle';
import { LocalStorageService } from './services/local-storage-service';
import { ToggleThemeService } from './services/toggle-theme-service';
import { Preloader } from './common/preloader/preloader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeToggle, Preloader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(private themeService: ToggleThemeService) {}
  ngOnInit(): void {
    this.themeService.setMode();
  }
  protected title = 'Socially';
}
