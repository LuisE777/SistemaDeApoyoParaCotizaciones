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
  displayedColumnsGeneral = ['position', 'name','weight','symbol','fecha'];
  dataSourceGeneral: MatTableDataSource<Log>;  

  //@ViewChild(MatPaginator) paginatorganeral: MatPaginator;
  @ViewChild('firstPaginator', {static: true}) firstPaginator: MatPaginator;

  /* LOGS INFORME */
  datalogs:LogInforme[];
  displayedColumns = ['position', 'name', 
                      'weight.properties.attributes.nombre_cotizador',
                       'symbol.properties.attributes.tipo_informe','fecha'];
  dataSource: MatTableDataSource<LogInforme>;  

  @ViewChild('secondPaginator', {static: true}) secondPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
   //DATA below 

  constructor(private http: HttpClient){
    
  }

 ngOnInit(): void {
    this.getLogs();
     this.getLogsInfo();
    //this.dataSource.data = this.datalogs; 
    //this.datalogs[0].properties.attributes.nombre_cotizador;   
  }

  async getLogsInfo() { 
    const res: any = await this.http
    .get<LogInforme>(this.linkApi+'/api/auth/informe-logs')
    .toPromise();
    this.datalogs = res; 
    console.log("Los datos",this.datalogs);     
    //this.dataSource.data = this.datalogs;
    
    this.dataSource = new MatTableDataSource<LogInforme>(this.datalogs);
    console.log("Los datos for the tbale Dataset",this.dataSource.data);
    this.dataSource.paginator = this.secondPaginator;    
    this.dataSource.paginator._intl.itemsPerPageLabel='Items por pagina';   
    
    /*
    this.dataSource.filterPredicate = 
    (data: LogInforme, filter: string) => data.properties.attributes.nombre_cotizador.indexOf(filter) != -1;

    */
  } 

  async getLogs() { 
    const res: any = await this.http
    .get<Log>(this.linkApi+'/api/auth/logs')
    .toPromise();
    this.datalogsgeneral = res; 
    console.log("Los datos",this.datalogsgeneral);     
    //this.dataSource.data = this.datalogs;
    
    this.dataSourceGeneral = new MatTableDataSource<Log>(this.datalogsgeneral);
    //console.log("Los datos for the tbale Dataset",this.dataSource.data);
    this.dataSourceGeneral.paginator = this.firstPaginator;    
    this.dataSourceGeneral.paginator._intl.itemsPerPageLabel='Items por pagina';   
    
    /*
    this.dataSource.filterPredicate = 
    (data: LogInforme, filter: string) => data.properties.attributes.nombre_cotizador.indexOf(filter) != -1;

    */
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

}


