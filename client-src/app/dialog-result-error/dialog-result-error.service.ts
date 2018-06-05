import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { DialogResultErrorComponent } from './dialog-result-error.component';


@Injectable()
export class DialogResultErrorService {
  constructor(private dialog: MdDialog) { }

  public showWarning(title: string, message: string): Observable<void>{
    let dialogRef: MdDialogRef<DialogResultErrorComponent>;

    dialogRef = this.dialog.open(DialogResultErrorComponent, {
      width: '380px'
    });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

  public showMultipleWarn(title: string, message: Array<string>): Observable<void>{
    let dialogRef: MdDialogRef<DialogResultErrorComponent>;
    let msg = message.join("<br/>");

    dialogRef = this.dialog.open(DialogResultErrorComponent, {
      width: '380px'
    });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = msg;

    return dialogRef.afterClosed();
  }

  public showError(message: string): Observable<void> {
    let dialogRef: MdDialogRef<DialogResultErrorComponent>;

    dialogRef = this.dialog.open(DialogResultErrorComponent, {
      width: '380px'
    });
    dialogRef.componentInstance.title = "Ops!";
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
