import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Log, LogInforme } from 'src/app/models/log.model';
import {MatSort} from '@angular/material/sort';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataRowOutlet } from '@angular/cdk/table';



@Component({
  selector: 'app-log-records',
  templateUrl: './log-records.component.html',
  styleUrls: ['./log-records.component.css']
})
export class LogRecordsComponent implements OnInit {
  
  //linkApi:string = 'http://apiser-vicios.herokuapp.com';
  linkApi:string = 'http://127.0.0.1:8000';


  /* LOGS GENERAL */
  datalogsgeneral:Log[];
  displayedColumnsGeneral = ['position', 'name',
                             'weight.properties.user.name',
                             'symbol.properties.ip','fecha'];
  dataSourceGeneral: MatTableDataSource<Log>;  

  //{{element.properties.attributes.tipo_informe}}
  //@ViewChild(MatPaginator) paginatorganeral: MatPaginator;
  @ViewChild('firstPaginator', {static: true}) firstPaginator: MatPaginator;


  //------------------------------------------------------------
    /* LOGS Solicitudes */
    datalogsolicitudes:Log[];
    displayedColumnsSolicitud = ['position', 'name',
                                  'weight.properties.user.name',
                                  'symbol.properties.ip','fecha'];
    dataSourceSolicitud: MatTableDataSource<Log>;  
  
    @ViewChild('thirdPaginator', {static: true}) thirdPaginator: MatPaginator;
 //-----------------------------------------------------
  /* LOGS INFORME */
  datalogs:Log[];
  displayedColumns = ['position', 'name', 
                      'weight.properties.user.name',
                      'symbol.properties.ip','fecha'];
  dataSource: MatTableDataSource<Log>;  

  @ViewChild('secondPaginator', {static: true}) secondPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   //DATA below 

 
   // THE SPINNER
   loading:boolean  = false;
   value = 0;


  constructor(private http: HttpClient,private _dialog: MatDialog){
    
  }

 ngOnInit(): void {
    this.getLogs();
    this.getBackFiles(); //THIS added on the middle
    this.getSolicitudes();
    this.getLogsInfo();

    
    //this.dataSource.data = this.datalogs; 
    //this.datalogs[0].properties.attributes.nombre_cotizador;   
  }


  
  async getLogs() { 
    const res: any = await this.http
    .get<Log>(this.linkApi+'/api/auth/logs')
    .toPromise();
    this.datalogsgeneral = res; 
    //console.log("Los datos general",this.datalogsgeneral);     
    //this.dataSource.data = this.datalogs;
    
    this.dataSourceGeneral = new MatTableDataSource<Log>(this.datalogsgeneral);
   // console.log("Los datos general",this.dataSourceGeneral.data);
    this.dataSourceGeneral.paginator = this.firstPaginator;    
    this.dataSourceGeneral.paginator._intl.itemsPerPageLabel='Items por pagina';  
    
  } 

  async getLogsInfo() { 
    const res: any = await this.http
    .get<Log>(this.linkApi+'/api/auth/logs-cotizaciones')
    .toPromise();
    this.datalogs = res; 
    //console.log("Los datos de cotizaciones",this.datalogs);     
    //this.dataSource.data = this.datalogs;
    
    this.dataSource = new MatTableDataSource<Log>(this.datalogs);
    //console.log("Los datos for the tbale Dataset",this.dataSource.data);
    this.dataSource.paginator = this.secondPaginator;    
    this.dataSource.paginator._intl.itemsPerPageLabel='Items por pagina';   
    
    /*

   logs-filtered
  logs-solicitudes
    logs-cotizaciones
    
    */
  } 

  async getSolicitudes(){
    const res: any = await this.http
    .get<Log>(this.linkApi+'/api/auth/logs-solicitudes')
    .toPromise();
    this.datalogsolicitudes = res; 
    //console.log("Los datos solcitudes",this.datalogsolicitudes);     
    //this.dataSource.data = this.datalogs;
    
    this.dataSourceSolicitud = new MatTableDataSource<Log>(this.datalogsolicitudes);
    //console.log("Los datos for the tbale Dataset",this.dataSource.data);
    this.dataSourceSolicitud.paginator = this.thirdPaginator;    
    this.dataSourceSolicitud.paginator._intl.itemsPerPageLabel='Items por pagina'; 
  }

  
  chooseColor(row) {	
    if (row.description == "created") {
        return "#90EE90" //lightgreen
       }
    else if (row.description == "updated")
        return "#f5ac4d" //LightSkyBlue 
    else
        return "#e65b66"
      }
    
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
       // console.log("Value gotten: ",filterValue);
       // console.log("data filtered",this.dataSource.filteredData);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

      applyFilterGenLogs(event: Event) {

        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourceGeneral.filter = filterValue.trim().toLowerCase();
        //console.log("Value gotten: ",filterValue);
        //console.log("data filtered",this.dataSourceGeneral.filteredData);
        
        if (this.dataSourceGeneral.paginator) {
          this.dataSourceGeneral.paginator.firstPage();
        }
      }

      MassaArray = [];
      async getBackFiles(){
        //this.linkApi+'/api/auth/get-backs'
        //http://apiser-vicios.herokuapp.com/api/auth/get-backs
        const res: any = await this.http
        .get<Log>('http://127.0.0.1:8000/api/auth/get-backs')
        .toPromise();
        this.MassaArray = res; 
        console.log("Los datas",this.MassaArray);     
        //this.dataSource.data = this.datalogs;
   
      }

      async setNewBack(){
        const res: any = await this.http
        .get<Log>(this.linkApi+'/api/auth/setbackup')
        .toPromise();
        this.datalogsolicitudes = res; 
        console.log("NEW ",this.datalogsolicitudes);     
        //this.dataSource.data = this.datalogs;
        //restore
      }

      /*
      async restoreFromZip(){
        const res: any = await this.http
        .get<Log>(this.linkApi+'/api/auth/restore')
        .toPromise();
        this.datalogsolicitudes = res; 
        console.log("Los datos solcitudes",this.datalogsolicitudes);     
        //this.dataSource.data = this.datalogs;
        //restore
      }
*/

openDialog(row:Log){
  console.log("details:", row);

  console.log('Row clicked', row);
  const dialog = this._dialog.open(DialogComponent, {
    width: '400px',
    // Can be closed only by clicking the close button
    disableClose: true,
    data: row
  });
}


      hasName(row){
          if (row){
            
            return true;
          }else 
          return false;      
      }

  createNewBack(){
    
    this.loading = true;
    const someObject = {
      nom:"massa"
    }
    let seHaGuardado;
    console.log("GETTINNNNN IN");

    this.http.post('http://127.0.0.1:8000/api/auth/setbackup', someObject)
      .subscribe((val) => {         
   
        seHaGuardado = (Object.keys(val).length === 0) ? 0 : 1;
        console.log("POST call successful value returned in body", val) 

        //hope
        if(seHaGuardado === 1 ) {          
          this.loading = false;
        }
      },
        response => {
          console.log("POST call in error", response) 
        },
        () => {
          console.log("The message POST has been send | Completed.");
          if(seHaGuardado === 1){
            console.log("SE HA CREADO UN NUEVO PUNTO DE RESTAURACION");
            //refresh the site
          }else {            
            console.log("Falied");
            
          }
        });     

  }
  
  restoreFromPoint(was){
    //Now we gotta get the name 
    this.loading = true;
    this.MassaArray[was];
   // console.log("File name:",this.MassaArray[was]);

    
    
    const someObject = {
      nom: this.MassaArray[was]
    }
    let seHaGuardado;
    console.log("GETTINNNNN IN",someObject );
    
    this.http.post('http://127.0.0.1:8000/api/auth/restore', someObject)
      .subscribe((val) => {         
        console.log("MUCHOS", val);
        seHaGuardado = (Object.keys(val).length === 0) ? 0 : 1;
        console.log("POST call successful value returned in body", val) 

        //hope
        if(seHaGuardado === 0 ) {          
          this.loading = false;
        }
      },
        response => {
          console.log("POST call in error", response) 
        },
        () => {
          console.log("The message POST has been send | Completed.");
          if(seHaGuardado === 1){
            console.log("SE HA RESTAURADO");
            //refresh the site
          }else {            
            console.log("Failed");
            
          }
        });
        

   // console.log("CLIKING IT ", was);
  }

}


