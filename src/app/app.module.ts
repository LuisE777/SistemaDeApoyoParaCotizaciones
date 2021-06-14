import { RegistroEmpresaComponent } from './registros/registro-empresa/registro-empresa.component';
import { SolicitudCotizacionComponent } from './solicitud-cotizacion/solicitud-cotizacion.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegistroUsuarioComponent } from './registros/registro-usuario/registro-usuario.component';
import { RegistroUnidadComponent } from './registros/registro-unidad/registro-unidad.component';
import { RegistroRolComponent } from './registros/registro-rol/registro-rol.component';
import { LoginComponent } from './login/login.component';
import { FormSolicitudComponent } from './form-solicitud/form-solicitud.component';
import { RegistroItemComponent } from './registros/registro-item/registro-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiagitemComponent } from './form-solicitud/diagitem/diagitem.component';
//Adiciones para tabal de Solicitud
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AutocompletarComponent } from './form-solicitud/diagitem/autocompletar/autocompletar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { ItemsComponent } from './components/items/items.component';
import { UnidadesComponent } from './components/unidades/unidades.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatDatepickerModule} from '@angular/material/datepicker'; 

import { SharedModule } from '../app/navbar/shared/shared.module';
import { AdministradorComponent } from './administrador/administrador.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { ListaRolesComponent } from './lista-roles/lista-roles.component';
import { MisSolicitudesComponent } from './mis-solicitudes/mis-solicitudes.component';
import { RegistroItemSupComponent } from './registros/registro-item-sup/registro-item-sup.component';
import { ItemSupComponent } from './components/item-sup/item-sup.component';
import { ItemSupPresupuestoComponent } from './item-sup-presupuesto/item-sup-presupuesto.component';
import { MenuInicioComponent } from './components/menu-inicio/menu-inicio.component';
import { AuthGuard } from './auth.guard';
import { FechaPresupuestoComponent } from './components/fecha-presupuesto/fecha-presupuesto.component';
import { MatNativeDateModule } from '@angular/material/core';
import { RegistroPresupuestoComponent } from './components/registro-presupuesto/registro-presupuesto.component';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { MatSelectModule } from '@angular/material/select';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { CotizandoComponent } from './cotizando/cotizando.component';
import { SeleccionEmpresaComponent } from './cotizando/seleccion-empresa/seleccion-empresa.component';
import { ListaPresupuestosComponent } from './components/lista-presupuestos/lista-presupuestos.component';
import { CotizacionItemsModule } from './registros/cotizacion-items/cotizacion-items.module';
import { MatRadioModule } from '@angular/material/radio';
import { ConvMonedaComponent } from './components/conv-moneda/conv-moneda.component';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { JefeComponent } from './jefe/jefe.component';
import { AdministrativosComponent } from './administrativos/administrativos.component';
import { SecretariaComponent } from './secretaria/secretaria.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RedactarInformeComponent } from './components/redactar-informe/redactar-informe.component';
import { InformeCotizadoComponent } from './components/redactar-informe/informe-cotizado/informe-cotizado.component';

import { AccordionComponent } from './accordion/accordion.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { SeleccioneAnioComponent } from './presupuesto-actual/seleccione-anio/seleccione-anio.component';
import { FilterPipe } from './pipes/filter.pipe';
import { Filter1Pipe } from './pipes/filter1.pipe';
import { Filter2Pipe } from './pipes/filter2.pipe';
import { Filter3Pipe } from './pipes/filter3.pipe';
import { Filter4Pipe } from './pipes/filter4.pipe';
import { Filter5Pipe } from './pipes/filter5.pipe';
import { Filter6Pipe } from './pipes/filter6.pipe';
import { Filter7Pipe } from './pipes/filter7.pipe';



//Hasta aquis

@NgModule({
  declarations: [
    RegistroEmpresaComponent,
    AppComponent,
    RegistroUsuarioComponent,
    RegistroUnidadComponent,
    LoginComponent,
    AccordionComponent,
    FormSolicitudComponent,
    RegistroItemComponent,
    DiagitemComponent,
    AutocompletarComponent,
    RegistroRolComponent,
    SolicitudesComponent,
    ItemsComponent,
    UnidadesComponent,
    SolicitudesComponent,    
    NavbarComponent,
    AdministradorComponent,
    UsuarioComponent, 
    ListaUsuariosComponent, 
    ListaRolesComponent, 
    MisSolicitudesComponent, 
    RegistroItemSupComponent, 
<<<<<<< HEAD
    ItemSupComponent, ItemSupPresupuestoComponent, MenuInicioComponent,SolicitudCotizacionComponent, CotizacionesComponent, CotizandoComponent, SeleccionEmpresaComponent, FechaPresupuestoComponent, RegistroPresupuestoComponent, ListaPresupuestosComponent, ConvMonedaComponent, CotizadorComponent, JefeComponent, AdministrativosComponent, SecretariaComponent, AccordionComponent, ListaEmpresasComponent, SeleccioneAnioComponent, FilterPipe, Filter1Pipe, Filter2Pipe, Filter3Pipe, Filter4Pipe, Filter5Pipe, Filter6Pipe, Filter7Pipe
=======
    RedactarInformeComponent, 
    InformeCotizadoComponent,
    ItemSupComponent, ItemSupPresupuestoComponent, MenuInicioComponent,SolicitudCotizacionComponent, CotizacionesComponent, CotizandoComponent, SeleccionEmpresaComponent, FechaPresupuestoComponent, RegistroPresupuestoComponent, ListaPresupuestosComponent, ConvMonedaComponent, CotizadorComponent, JefeComponent, AdministrativosComponent, SecretariaComponent, AccordionComponent, ListaEmpresasComponent, SeleccioneAnioComponent, FilterPipe
>>>>>>> 765c927d8f7861af8f927d376b8e7e1913eca25d
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    SharedModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule,
    SharedModule,
    CotizacionItemsModule,
    MatRadioModule,
    MatExpansionModule, 
      
  ],
  exports: [
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
