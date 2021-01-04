import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interFace';
import { Minerals } from 'src/app/shared/models/minerals.interFace';
import { Hero } from 'src/app/shared/models/hero.interFace';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('mikepruebas23@gmail.com',[Validators.email, Validators.required]),
    password: new FormControl('mikegeko1',[Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authSvc: AuthService,
    private afs: AngularFirestore,
    private router: Router,
    private _snackBar: MatSnackBar) { }
    
  hide = true;

  ngOnInit(): void {}

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      if (user) {
        this.checkUserIsVerified(user);
        this.valideUserSmash(user.uid, email, user.emailVerified);
        this.validateMinerals(user.uid, email);
        this.validateHero(user.uid, email);
        // window.location.reload();
        this.router.navigate(['/home']);
      }
    } catch (error) {
      // console.log(error);
      this.openSnackBar('Correo o contraseña incorrecta');
    }
  }

  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);
    } else if (user) {
      this.authSvc.logout();
      this.router.navigate(['/verification-email']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  async valideUserSmash(id, email, verified){
    let data: any;
    data = await this.afs.collection('users').doc(id).valueChanges().subscribe(value => {
      if(value == undefined) {
        try {
          const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${id}`);

          const data: User = {
            uid: id,
            email: email,
            emailVerified: verified,
            role: 'SUSCRIPTOR',
            photoURL: null,
            tagName: null,
            rnkPoints: 0,
            position: ''
          };

          return userRef.set(data, { merge: true });
      }
        catch (error) 
        {
          console.log('ERROR: ', error);
        }
      }
      else
      {
        sessionStorage.setItem('USEREMAIL',value['email']);
        sessionStorage.setItem('USERTAGNAME',value['tagName']);
        sessionStorage.setItem('USERUID',value['uid']);
        sessionStorage.setItem('RNKPOINTS',value['rnkPoints']);
        sessionStorage.setItem('USERPHOTOURL',value['photoURL']);
      }
    });
    return data;
  }

  async validateMinerals(id, email){
    let data: any;
    data = await this.afs.collection('minerals').doc(id).valueChanges().subscribe(value => {
      if(value == undefined) {
        try {
          const userRef: AngularFirestoreDocument<Minerals> = this.afs.doc(`minerals/${id}`);

          const data: Minerals = {
            uid: id,
            email: email,
            gold: null
          };

          return userRef.set(data, { merge: true });
      }
        catch (error) 
        {
          console.log('ERROR: ', error);
        }
      }
      else
      {
        sessionStorage.setItem('GOLD',value['gold']);
      }
    });
    return data;
  }

  async validateHero(id, email){
    let data: any;
    data = await this.afs.collection('hero').doc(id).valueChanges().subscribe(value => {
      if(value == undefined) {
        try {
          const userRef: AngularFirestoreDocument<Hero> = this.afs.doc(`hero/${id}`);

          const data: Hero = {
            uid: id,
            email: email,
            name: null,
            atk: null,
            def: null,
            life: null,
            exp: null,
            lvl: null,
            active: false
          }

          return userRef.set(data, { merge: true });
      }
        catch (error) 
        {
          console.log('ERROR: ', error);
        }
      }
      else
      {
        sessionStorage.setItem('HERONAME',value['name']);
        sessionStorage.setItem('HEROATK',value['atk']);
        sessionStorage.setItem('HERODEF',value['def']);
        sessionStorage.setItem('HEROLIFE',value['life']);
        sessionStorage.setItem('HEROEXP',value['exp']);
        sessionStorage.setItem('HEROLVL',value['lvl']);
      }
    });
    return data;
  }

}
