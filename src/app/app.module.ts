import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AutocompletarComponent } from './form-solicitud/diagitem/autocompletar/autocompletar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';



//Hasta aquis

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    RegistroUnidadComponent,
    LoginComponent,
    FormSolicitudComponent,
    RegistroItemComponent,
    DiagitemComponent,
    AutocompletarComponent,
    RegistroRolComponent,
    SolicitudesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
