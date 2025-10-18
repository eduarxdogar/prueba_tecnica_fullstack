import { Routes } from '@angular/router';
import { UsuarioListComponent } from '../app/components/usuario-list/usuario-list';
import { UsuarioFormComponent } from '../app/components/usuario-form/usuario-form';

export const routes: Routes = [
  { path: 'usuarios', component: UsuarioListComponent },
  
  { path: 'crear-usuario', component: UsuarioFormComponent },

  { path: 'editar-usuario/:id', component: UsuarioFormComponent },

  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },

  { path: '**', redirectTo: 'usuarios' }
];