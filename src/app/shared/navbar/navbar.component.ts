import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService]
})
export class NavbarComponent {
  public user$: Observable<any> = this.authSvc.afAuth.user;

  @Output() OCSidenav = new EventEmitter<boolean>();
  constructor(private authSvc: AuthService, private router: Router) { }

  async onLogout(){
    try 
    {
      this.authSvc.logout();
      this.router.navigate(['/login']);
      sessionStorage.removeItem('GOLD');
      sessionStorage.removeItem('USEREMAIL',);
      sessionStorage.removeItem('USERTAGNAME');
      sessionStorage.removeItem('USERUID');
      sessionStorage.removeItem('USERPHOTOURL');
      sessionStorage.removeItem('RNKPOINTS');

      sessionStorage.removeItem('HERONAME');
      sessionStorage.removeItem('HEROATK');
      sessionStorage.removeItem('HERODEF');
      sessionStorage.removeItem('HEROLIFE');
      sessionStorage.removeItem('HEROEXP');
      sessionStorage.removeItem('HEROLVL');

    } catch (error) 
    {
      console.log('ERROR: ',error);
    }
  }

  openSidenav(){
    this.OCSidenav.emit(true);
  }

}
