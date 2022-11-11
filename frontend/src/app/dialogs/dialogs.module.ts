import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
@NgModule({
  declarations: [
    ConfirmDialogComponent,
  ],
  imports: [SharedModule, MatDialogModule],
})
export class DialogsModule { }
