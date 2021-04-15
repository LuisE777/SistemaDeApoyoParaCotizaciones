import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroItemComponent } from './registros/registro-item/registro-item.component';
import { RegistroUnidadComponent } from './registros/registro-unidad/registro-unidad.component';
import { RegistroUsuarioComponent } from './registros/registro-usuario/registro-usuario.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrounidad',
    component: RegistroUnidadComponent
  },
  {
    path: 'registrousuario',
    component: RegistroUsuarioComponent
  },{
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
