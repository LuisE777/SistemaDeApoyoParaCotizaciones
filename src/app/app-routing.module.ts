import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { FormSolicitudComponent } from './form-solicitud/form-solicitud.component';
import { LoginComponent } from './login/login.component';
import { RegistroItemComponent } from './registros/registro-item/registro-item.component';
import { RegistroRolComponent } from './registros/registro-rol/registro-rol.component';
import { RegistroUnidadComponent } from './registros/registro-unidad/registro-unidad.component';
import { RegistroUsuarioComponent } from './registros/registro-usuario/registro-usuario.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'form-solicitud',
    component: FormSolicitudComponent
  },
  {
    path: 'registrounidad',
    component: RegistroUnidadComponent
  },
  {
    path: 'registrousuario',
    component: RegistroUsuarioComponent
  },  
  {
    path: 'registroRol',
    component: RegistroRolComponent
  },
  {
    path: 'solicitudes',
    component: SolicitudesComponent
  },
  {
    path: 'registroitem',
    component: RegistroItemComponent
  },
  { path: '**', component: LoginComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  //RouterModule.forRoot(routes)
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
