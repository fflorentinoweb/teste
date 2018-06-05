import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { DialogConfirmComponent } from './dialog-confirm.component';

@Injectable()
export class DialogConfirmService {
  constructor(private dialog: MdDialog) { }

  public confirm(title: string, message: string): Observable<boolean>{
    let dialogRef: MdDialogRef<DialogConfirmComponent>;

    dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '380px',
      panelClass: 'cdk-overlay-pane-alert-confirm'
    });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
