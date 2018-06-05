import { Component, OnInit, Inject  } from '@angular/core';
import { Router } from '@angular/router'
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-result-error',
  templateUrl: './dialog-result-error.component.html',
  styleUrls: ['./dialog-result-error.component.scss']
})
export class DialogResultErrorComponent {
  public title: string;
  public message: string;
  public routerActive: any

  constructor(
    public dialogRef: MdDialogRef < DialogResultErrorComponent > ,
    public dialog: MdDialog,
    private router: Router,
    @Inject(DOCUMENT) doc: any) {
    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('dialog-open')) {
        doc.body.classList.add('dialog-open');
      }
    });
    dialog.afterAllClosed.subscribe(() => {
      doc.body.classList.remove('dialog-open');
    });

    this.routerActive = router;
  }

  OnClose() {
    if (this.routerActive.url == '/PainelDeValetas' || this.routerActive.url == '/RegistroPresenca') {
      this.dialog.closeAll()
    } else {
      this.dialogRef.close()
    }
  }
}
