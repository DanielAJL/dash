import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) data: any;
  @Inject(MAT_DIALOG_DATA) title!: string;

  constructor() { }
  ngOnInit(): void {

    console.log(this.data);


  }

}
