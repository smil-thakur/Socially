import { Component, OnInit, inject } from '@angular/core';
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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ErrorDialog } from '../../common/error-dialog/error-dialog';
import { InfoDialog } from '../../common/info-dialog/info-dialog';
import { PreloaderService } from '../../services/preloader-service';
import { FirebaseError } from '@angular/fire/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from '@angular/fire/auth';

@Component({
  selector: 'app-register-screen',
  imports: [
    ReactiveFormsModule,
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
    HlmLabelDirective,
    Logo,
  ],
  templateUrl: './register-screen.html',
  styleUrl: './register-screen.scss',
})
export class RegisterScreen extends BasePageScreen implements OnInit {
  public registerForm: FormGroup | null = null;
  private auth = inject(Auth);
  private readonly _hlmDialogService = inject(HlmDialogService);
  private provider = new GoogleAuthProvider();
  private preloaderService = inject(PreloaderService);
  constructor(private router: Router) {
    super();
  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl({ value: null, disabled: false }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl({ value: null, disabled: false }, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl({ value: null, disabled: false }, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
      ]),
    });
  }
  public hidden = true;
  public navigateToLoginScreen() {
    this.router.navigate(['/login']);
  }
  public showPasswordToggle(event: boolean) {
    this.hidden = !event;
  }

  public loginWithGoogle() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      this.router.navigate(['/home']);
      return credential;
    });
  }

  public async registerWithEmail() {
    if (!this.registerForm?.valid) {
      this.registerForm?.markAllAsTouched();
      return;
    }
    const username = this.registerForm.get('username')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    this.preloaderService.show();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      await sendEmailVerification(userCredential.user);
      this.preloaderService.hide();
      this._hlmDialogService.open(InfoDialog, {
        context: {
          info: 'A verification email has been sent to your email address. Please verify your email before logging in.',
          desc: 'Verify your email',
        },
      });
    } catch (error) {
      this.preloaderService.hide();
      const firebaseError = error as FirebaseError;
      this._hlmDialogService.open(ErrorDialog, {
        context: {
          error: firebaseError.message,
          desc: 'Problem while registering',
        },
      });
    }
  }
}
