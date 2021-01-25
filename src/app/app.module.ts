import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LayoutModule } from './layout/layout.module';  

import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';;
import { environment } from './../environments/environment';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { AuthService } from './auth/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';


import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';

import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MiTablaComponent } from './mi-tabla/mi-tabla.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterCodeComponent } from './register-code/register-code.component';
import { HistoryComponent } from './history/history.component';
import { LevelsComponent } from './levels/levels.component';
import { DeckComponent } from './deck/deck.component';
import { StoreComponent } from './store/store.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SendEmailComponent,
    ProfileComponent,
    MiTablaComponent,
    SideNavComponent,
    UserDetailsComponent,
    ContactComponent,
    RegisterCodeComponent,
    HistoryComponent,
    LevelsComponent,
    DeckComponent,
    StoreComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, AngularFireStorageModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule, MatSelectModule, MatIconModule,
    MatCardModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatToolbarModule,
    MatSidenavModule,
    
  ],
  exports: [SideNavComponent],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
