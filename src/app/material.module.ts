import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
    MatCardModule,
    DragDropModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule
  ],
  exports: [
    MatIconModule,
    MatCardModule,
    DragDropModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: []
})
export class MaterialModule {}
