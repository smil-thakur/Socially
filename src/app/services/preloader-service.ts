import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();

  constructor(private router: Router) {
    // On every successful route change, hide the loader
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hide();
      });
  }

  show() {
    document.body.classList.add('overflow-hidden');
    this._loading.next(true);
  }
  hide() {
    document.body.classList.remove('overflow-hidden');
    this._loading.next(false);
  }
}
