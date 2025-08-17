import { Component, inject } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmCardDescription } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [HlmButton, HlmDialogImports, HlmCardDescription],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss',
})
export class ConfirmationDialog {
  private readonly _dialogRef = inject<BrnDialogRef<String>>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<{
    title: string;
    desc: string;
  }>();

  protected readonly title = this._dialogContext.title;
  protected readonly desc = this._dialogContext.desc;

  public declined() {
    this._dialogRef.close('no');
  }

  public confirmed() {
    this._dialogRef.close('yes');
  }
}
