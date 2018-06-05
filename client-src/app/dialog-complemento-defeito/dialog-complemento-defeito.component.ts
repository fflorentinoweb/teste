import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-complemento-defeito',
  templateUrl: './dialog-complemento-defeito.component.html',
  styleUrls: ['./dialog-complemento-defeito.component.scss']
})
export class DialogComplementoDefeitoComponent implements OnInit {

  constructor(private dialog: MdDialog,
    private dialogRef: MdDialogRef<DialogComplementoDefeitoComponent>,
    @Inject(MD_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }

}
