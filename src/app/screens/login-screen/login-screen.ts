import { Component, inject, OnInit } from '@angular/core';
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
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ErrorDialog } from '../../common/error-dialog/error-dialog';
import { PreloaderService } from '../../services/preloader-service';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-login-screen',
  imports: [
    ReactiveFormsModule,
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
    HlmLabelDirective,
    Logo,
  ],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen extends BasePageScreen implements OnInit {
  private auth = inject(Auth);
  private provider = new GoogleAuthProvider();
  private readonly _hlmDialogService = inject(HlmDialogService);
  private preloaderService = inject(PreloaderService);

  public loginForm: FormGroup | null = null;
  constructor(private router: Router) {
    super();
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl({ value: null, disabled: false }, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl({ value: null, disabled: false }, [
        Validators.required,
      ]),
    });
  }

  get email() {
    return this.loginForm?.get('email');
  }

  get password() {
    return this.loginForm?.get('password');
  }

  public hidden = true;
  public navigateToRegisterScreen() {
    this.router.navigate(['/register']);
  }

  public showPasswordToggle(event: boolean) {
    this.hidden = !event;
  }

  public navigateToHomeScreen() {
    this.router.navigate(['/home']);
  }

  public loginWithGoogle() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      this.router.navigate(['/home']);
      return credential;
    });
  }

  public async loginWithEmail() {
    if (!this.loginForm?.valid) {
      this.loginForm?.markAllAsTouched();
      return;
    }
    const email = this.email?.value;
    const password = this.password?.value;
    this.preloaderService.show();
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        this.preloaderService.hide();
        this._hlmDialogService.open(ErrorDialog, {
          context: {
            error: 'Please verify your email before logging in.',
            desc: 'Email not verified',
          },
        });
        return;
      }
      this.preloaderService.hide();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log('Login failed:', error);
      const firebaseError = error as FirebaseError;
      this.preloaderService.hide();
      this._hlmDialogService.open(ErrorDialog, {
        context: {
          error: firebaseError.message,
          desc: 'Problem while login',
        },
      });
    }
  }
}
