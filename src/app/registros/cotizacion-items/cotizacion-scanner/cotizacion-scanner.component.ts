import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { ItemCotizacionService } from 'src/app/services/item-cotizacion-service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { empresaCot } from '../cotizacion-items.component';

@Component({
  selector: 'app-cotizacion-scanner',
  templateUrl: './cotizacion-scanner.component.html',
  styleUrls: ['./cotizacion-scanner.component.css']
})
export class CotizacionScannerComponent implements OnInit {

  truearch: boolean = false;
  loader: boolean = false;
  myarch: string;
  final; boolean = true;
  form = new FormData();
  empresas: Empresa[] = [];
  cotizaciones: empresaCot[] = [];
  empresa_id: string;
  empresa_cotizacion_id: string;

  constructor(
    private userService: UsuarioService,
    private itemCotServ: ItemCotizacionService
  ) { }

  ngOnInit(): void {
    this.getEmpresas();
    this.getEmpresasCot();
  }

  fileEvent(fileInput: Event) {
    let arch:any = fileInput.target;
    if(arch.files.length > 0){
      this.loader = true;
      this.form.append('file',arch.files[0]);
    }
  }

  getEmpresas(){
    this.userService.getAllEmpresas().subscribe(data => {
      this.empresas = data;
    })
  }

  getEmpresasCot(){
    this.userService.getAllEmpresasCot().subscribe(data => {
      this.cotizaciones = data;
    })
  }

  selectEmpresa(event){
    this.empresa_id = event.target.value;
    
  }
  
  selectEmpresaCot(event){
    this.empresa_cotizacion_id = event.target.value;
  }

  submitForm(){
    this.itemCotServ.subirArchivo(this.form).subscribe( resp=>{
      this.loader = false;
        if(resp.status){
          this.truearch = true;
        }
      }),
      error => {
        this.loader = false;
        alert('Ha ocurrido un error');
      }
  }

}
