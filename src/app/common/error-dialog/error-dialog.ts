import { Component, inject } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
@Component({
  selector: 'app-error-dialog',
  imports: [HlmDialogImports, HlmButton],
  templateUrl: './error-dialog.html',
  styleUrl: './error-dialog.scss',
})
export class ErrorDialog {
  private readonly _dialogRef = inject<BrnDialogRef>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<{
    error: string;
    desc: string;
  }>();

  protected readonly errorMessage = this._dialogContext.error;
  protected readonly desc = this._dialogContext.desc;

  public closeDialog() {
    this._dialogRef.close();
  }
}
