import { Component, inject } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
@Component({
  selector: 'app-info-dialog',
  imports: [HlmDialogImports, HlmButton],
  templateUrl: './info-dialog.html',
  styleUrl: './info-dialog.scss',
})
export class InfoDialog {
  private readonly _dialogRef = inject<BrnDialogRef>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<{
    info: string;
    desc: string;
  }>();

  protected readonly infoMessage = this._dialogContext.info;
  protected readonly desc = this._dialogContext.desc;

  public closeDialog() {
    this._dialogRef.close();
  }
}
