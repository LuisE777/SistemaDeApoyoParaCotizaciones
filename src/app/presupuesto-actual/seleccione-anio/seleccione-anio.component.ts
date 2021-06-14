import { LoginComponent } from './../../login/login.component';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-seleccione-anio',

  templateUrl: './seleccione-anio.component.html',
  styleUrls: ['./seleccione-anio.component.css']
})
export class SeleccioneAnioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>,private fb: FormBuilder,  private router: Router) { }

  ngOnInit(): void {
  }
  miFormulario2: FormGroup = this.fb.group({
    empresa: ['',[Validators.required]]})

  cancelar() {    
    this.dialogRef.close();   
  }

}
