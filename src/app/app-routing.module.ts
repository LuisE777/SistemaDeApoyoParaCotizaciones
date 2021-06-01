import { CotizandoComponent } from './cotizando/cotizando.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { SolicitudCotizacionComponent } from './solicitud-cotizacion/solicitud-cotizacion.component';
import { MisSolicitudesComponent } from './mis-solicitudes/mis-solicitudes.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
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
import { ListaRolesComponent } from './lista-roles/lista-roles.component';
import { RegistroItemSupComponent } from './registros/registro-item-sup/registro-item-sup.component';
import { ItemSupComponent } from './components/item-sup/item-sup.component';
import { ItemSupPresupuestoComponent } from './item-sup-presupuesto/item-sup-presupuesto.component';
import { MenuInicioComponent } from './components/menu-inicio/menu-inicio.component';
import { AuthGuard } from './auth.guard';

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
    path: 'listausuarios',
    component: ListaUsuariosComponent
  },
  {
    path: 'cotizando/:id',
    component: CotizandoComponent
  },
  {
    path: 'form-solicitud',
    component: FormSolicitudComponent,
    canActivate: [AuthGuard]
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
    path: 'registrousuario',
    component: RegistroUsuarioComponent
  },
  {
    path: 'misSolicitudes',
    component: MisSolicitudesComponent
  },{
    path: 'listarol',
    component: ListaRolesComponent
  },
  {
    path: 'registroRol',
    component: RegistroRolComponent 
  },
  {
    path: 'solicitudes',
    component: SolicitudesComponent,
    
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
    path: 'registroitemsup',
    component: RegistroItemSupComponent
  },
  {
    path: 'itemsuperiores',
    component: ItemSupComponent
  },
  {
    path: 'registrounidades',
    component: RegistroUnidadComponent
  },
  {
    path: 'unidades',
    component: UnidadesComponent
  },
  {
    path: 'itemSupPresupuesto',
    component: ItemSupPresupuestoComponent
  },
  {
    path: 'cotizacion',
    component: CotizacionesComponent
  },
  {
    path: 'solicitudCotizacion',
    component: SolicitudCotizacionComponent
  },
  { path: '**', component: MenuInicioComponent },
  { path: '', component: MenuInicioComponent }
];

@NgModule({
  //RouterModule.forRoot(routes)
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
