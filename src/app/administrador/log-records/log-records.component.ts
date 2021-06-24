import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Log, LogInforme } from 'src/app/models/log.model';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-log-records',
  templateUrl: './log-records.component.html',
  styleUrls: ['./log-records.component.css']
})
export class LogRecordsComponent implements OnInit {
  
  linkApi:string = 'http://apiser-vicios.herokuapp.com';

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

  constructor(private http: HttpClient){
    
  }

 ngOnInit(): void {
    this.getLogs();
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
    console.log("Los datos general",this.datalogsgeneral);     
    //this.dataSource.data = this.datalogs;
    
    this.dataSourceGeneral = new MatTableDataSource<Log>(this.datalogsgeneral);
    console.log("Los datos general",this.dataSourceGeneral.data);
    this.dataSourceGeneral.paginator = this.firstPaginator;    
    this.dataSourceGeneral.paginator._intl.itemsPerPageLabel='Items por pagina';  
    
  } 

  async getLogsInfo() { 
    const res: any = await this.http
    .get<Log>(this.linkApi+'/api/auth/logs-cotizaciones')
    .toPromise();
    this.datalogs = res; 
    console.log("Los datos de cotizaciones",this.datalogs);     
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
    console.log("Los datos solcitudes",this.datalogsolicitudes);     
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
        console.log("Value gotten: ",filterValue);
        console.log("data filtered",this.dataSource.filteredData);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

      applyFilterGenLogs(event: Event) {

        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourceGeneral.filter = filterValue.trim().toLowerCase();
        console.log("Value gotten: ",filterValue);
        console.log("data filtered",this.dataSourceGeneral.filteredData);
        
        if (this.dataSourceGeneral.paginator) {
          this.dataSourceGeneral.paginator.firstPage();
        }
      }

   
   /*
      getLastWord(logi:Log){     
      var n = logi.subject_type.lastIndexOf('/');
      var result = logi.subject_type.substring(n + 1);

      logi.subject_type = result;
      return result;      
    }
    */

}


