import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, switchMap } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { Observable, of } from 'rxjs';
import { Roles, User } from '../../shared/models/user.interFace';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RoleValidator } from '../helpers/roleValidator';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService extends RoleValidator {

  public user$: Observable<User>;
  
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
    ) {
      super();
      this.user$ = this.afAuth.authState.pipe(
        switchMap(( user ) => {
          if (user){
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          }
          return of(null);
        })
      );
     }

  //REINICIAR CONTRASEÑA
  async resetPassword(email:string): Promise<void> {
    try 
    {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) 
    {
      console.log('ERROR: ',error);
    }
  }
  
  //ENVIAR VERIRIFACION EMAIL
  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  //INICIO DE SESION
  async login(email: string, password: string): Promise<User>{
    try 
    {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      // this.getUser(user.uid, email, user.emailVerified);
      return user;
    } catch (error) 
    {
      console.log('ERROR: ', error);
      // return error;
    }
  }

  //REGISTRO
  async register(email: string, password: string): Promise<User>{
    
    try 
    {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;
    } catch (error) 
    {
      console.log('ERROR: ', error);
    } 
  }

  //CERRAR SESION
  async logout(): Promise<void>{
    try 
    {
      await this.afAuth.signOut();
      window.location.reload();
    } catch (error) 
    {
      console.log('ERROR: ', error);
    } 
  }

  //VERIFICARLOGIN
  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  getCurrentUser(){
    let profile;
    return profile = this.afAuth.authState.pipe(first()).toPromise();
  }

  private updateUserData(user: User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      role: 'SUSCRIPTOR',
    };

    return userRef.set(data, { merge: true });

  }
  
  //Funciona
  public async updateUserSmash(user: User){
    try 
    {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );
      
      let subs: Roles = 'SUSCRIPTOR';
      if (user.email == 'armacomiguel@gmail.com') {
        subs = 'ADMIN';
      } else {
        subs = 'SUSCRIPTOR';
      }

      const data: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        role: subs,
        photoURL: user.photoURL,
        tagName: user.tagName,
        rnkPoints: user.rnkPoints,

      };

      return userRef.set(data, { merge: true });
  }
    catch (error) 
    {
      console.log('ERROR: ', error);
    }
  }

  public async updateUserSmashAdmin(user: User){

    // console.log('USAURIO SERVICE: ', user);
    try 
    {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );

      let subs: Roles = 'SUSCRIPTOR';
      if (user.email == 'armacomiguel@gmail.com') {
        subs = 'ADMIN';
      } else {
        subs = 'SUSCRIPTOR';
      }

      const data: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        role: subs,
        photoURL: user.photoURL,
        tagName: user.tagName,
        rnkPoints: user.rnkPoints,
        position: ''
      };

      return userRef.set(data, { merge: true });
  }
    catch (error) 
    {
      console.log('ERROR: ', error);
    }
  }

  public getUsers2(UID: string) {
    const uDetails: any = this.afs.collection('users').doc(UID);
    return uDetails;
  }

}
