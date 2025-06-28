import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmCheckboxComponent } from '@spartan-ng/helm/checkbox';

import {
  HlmCardDirective,
  HlmCardContentDirective,
  HlmCardHeaderDirective,
  HlmCardFooterDirective,
  HlmCardDescriptionDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { Logo } from '../../common/logo/logo';
import { BasePageScreen } from '../../common/base-page-screen/base-page-screen';
import { HlmLabelDirective } from '@spartan-ng/helm/label';

@Component({
  selector: 'app-register-screen',
  imports: [
    HlmButtonDirective,
    HlmFormFieldModule,
    HlmInputDirective,
    HlmCheckboxComponent,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardContentDirective,
    HlmLabelDirective,
    HlmCardFooterDirective,
    HlmCardDescriptionDirective,
    HlmCardTitleDirective,
    Logo,
  ],
  templateUrl: './register-screen.html',
  styleUrl: './register-screen.scss',
})
export class RegisterScreen extends BasePageScreen {
  constructor(private router: Router) {
    super();
  }
  public hidden = true;
  public navigateToLoginScreen() {
    this.router.navigate(['/login']);
  }
  public toggleVisibility() {
    this.hidden = !this.hidden;
  }
  public showPasswordToggle(event: boolean) {
    this.hidden = !event;
  }
}
