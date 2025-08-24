import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmCheckbox } from '@spartan-ng/helm/checkbox';

import { HlmCardImports } from '@spartan-ng/helm/card';
import { Logo } from '../../common/logo/logo';
import { BasePageScreen } from '../../common/base-page-screen/base-page-screen';
import { HlmLabel } from '@spartan-ng/helm/label';
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
  getAdditionalUserInfo,
} from '@angular/fire/auth';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-register-screen',
  imports: [
    ReactiveFormsModule,
    HlmButton,
    HlmFormFieldModule,
    HlmInput,
    HlmCheckbox,
    HlmCardImports,
    HlmLabel,
    Logo,
  ],
  templateUrl: './register-screen.html',
  styleUrl: './register-screen.scss',
})
export class RegisterScreen extends BasePageScreen implements OnInit {
  public registerForm: FormGroup | null = null;
  private auth = inject(Auth);
  private readonly _hlmDialogService = inject(HlmDialogService);
  private userService = inject(UserService);
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

  public async loginWithGoogle() {
    try {
      signInWithPopup(this.auth, this.provider).then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const additionalInfo = getAdditionalUserInfo(result);
        if (additionalInfo?.isNewUser) {
          await this.userService.mapIDwithEmail();
        }
        this.router.navigate(['/home']);
        return credential;
      });
    } catch (err) {
      this._hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'Unable to Sign you up',
          desc: `Error while authenticating with backend ${err}`,
        },
      });
    }
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
      await this.userService.mapIDwithEmail();
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
