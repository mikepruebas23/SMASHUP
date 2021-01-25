import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { CanEditGuard } from './auth/guards/can-edit.guard';
import { CanAdminGuard } from './auth/guards/can-admin.guard';
import { CanSuscriptorGuard } from './auth/guards/can-suscriptor.guard';
import { ProfileComponent } from './profile/profile.component';
import { MiTablaComponent } from '../app/mi-tabla/mi-tabla.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterCodeComponent } from './register-code/register-code.component';
import { HistoryComponent } from './history/history.component';
import { DeckComponent } from './deck/deck.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),  canActivate: [CanSuscriptorGuard] }, 
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) }, 
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'verification-email',component: SendEmailComponent },
  { path: 'forgot-password', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [CanAdminGuard] },
  { path: 'editor', loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule), canActivate: [CanEditGuard] },
  { path: 'suscriptor', loadChildren: () => import('./suscriptor/suscriptor.module').then(m => m.SuscriptorModule), canActivate: [CanSuscriptorGuard] },
  { path: 'profile',component: ProfileComponent, canActivate: [CanSuscriptorGuard] },
  { path: 'user-details/:id/:pos',component: UserDetailsComponent , canActivate:  [CanSuscriptorGuard]},
  { path: 'pr', component: MiTablaComponent, canActivate: [CanSuscriptorGuard]  },
  { path: 'contacto', component: ContactComponent },
  { path: 'register-code', component: RegisterCodeComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'deck', component: DeckComponent },
  { path: 'store', component: StoreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
