import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmCheckboxComponent } from '@spartan-ng/helm/checkbox';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
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

@Component({
  selector: 'app-login-screen',
  imports: [
    HlmButtonDirective,
    HlmFormFieldModule,
    HlmInputDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmCardDescriptionDirective,
    HlmCheckboxComponent,
    HlmLabelDirective,
    HlmCardTitleDirective,
    Logo,
  ],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen extends BasePageScreen {
  constructor(private router: Router) {
    super();
  }
  public hidden = true;
  public navigateToRegisterScreen() {
    this.router.navigate(['/register']);
  }
  public toggleVisibility() {
    this.hidden = !this.hidden;
  }

  public showPasswordToggle(event: boolean) {
    this.hidden = !event;
  }
}
