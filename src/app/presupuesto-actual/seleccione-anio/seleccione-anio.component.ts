import { DetallePresComponent } from './../detalle-pres/detalle-pres.component';
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

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<DetallePresComponent>,private fb: FormBuilder,  private router: Router) { }

  ngOnInit(): void {
  }
  miFormulario2: FormGroup = this.fb.group({
    anio: ['',[Validators.required]]})

  cancelar() {    
    this.dialogRef.close();   
  }

  guardarAnio(){
    console.log("papa");
    let anio = this.miFormulario2.controls.anio.value
    localStorage.setItem("anioPres",anio)
    this.dialogRef.close(); 
    console.log(anio);
    this.dialog.open(DetallePresComponent, {
    });
   
   }

 

}
