import { DOCUMENT, Inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root',
})
export class ToggleThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService
  ) {}

  getCurrentMode(): 'dark' | 'light' {
    if (this.localStorageService.getItem('mode') == 'dark') {
      return 'dark';
    } else if (this.localStorageService.getItem('mode') == 'light') {
      return 'light';
    } else {
      const html = this.document.documentElement;
      ``;
      if (html.classList.contains('dark')) {
        return 'dark';
      } else {
        return 'light';
      }
    }
  }

  setMode() {
    const html = this.document.documentElement;
    if (this.localStorageService.getItem('mode') == 'dark') {
      html.classList.add('dark');
    } else if (this.localStorageService.getItem('mode') == 'light') {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
      this.localStorageService.setItem('mode', 'dark');
    }
  }

  toggleMode() {
    const html = this.document.documentElement;
    if (this.localStorageService.getItem('mode') == 'dark') {
      html.classList.remove('dark');
      this.localStorageService.setItem('mode', 'light');
    } else if (this.localStorageService.getItem('mode') == 'light') {
      html.classList.add('dark');
      this.localStorageService.setItem('mode', 'dark');
    } else {
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        this.localStorageService.setItem('mode', 'dark');
      } else {
        html.classList.add('dark');
        this.localStorageService.setItem('mode', 'light');
      }
    }
  }
}
