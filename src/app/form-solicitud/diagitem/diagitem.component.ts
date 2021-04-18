import { Component, OnInit, Inject } from '@angular/core';

//addittions
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../form-solicitud/item';
import { AutocompletarComponent } from './autocompletar/autocompletar.component';



@Component({
  selector: 'app-diagitem',
  templateUrl: './diagitem.component.html',
  styleUrls: ['./diagitem.component.css']
})
export class DiagitemComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DiagitemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item) { }

  ngOnInit(): void {
  }
  cancelar() {
    this.dialogRef.close();
  }
}
