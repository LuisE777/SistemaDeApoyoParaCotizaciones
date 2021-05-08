import { UsuarioComponent } from './usuario/usuario.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { UnidadesComponent } from './components/unidades/unidades.component';
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
    path: 'usuario',
    component: UsuarioComponent
  },
  {
    path: 'form-solicitud',
    component: FormSolicitudComponent
  },
  {
    path: 'administrador',
    component: AdministradorComponent
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
  {
    path: 'items',
    component: ItemsComponent
  },
  {
    path: 'registrounidades',
    component: RegistroUnidadComponent
  },
  {
    path: 'unidades',
    component: UnidadesComponent
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
