import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Hero } from '../shared/models/hero.interFace';
@Injectable({providedIn: 'root'})

export class HeroService   {

  userRef: AngularFirestoreCollection<Hero> = null;
  COLLECTION: string = 'hero';

    constructor(
        public afAuth: AngularFireAuth,
        private afs: AngularFirestore,
    ){}

  //GET BY ID
  public heroIsActive(UID: string) {
    let response: any = this.afs.collection(this.COLLECTION).doc(UID);
    return response;
  }

  
 
  public async getAll() {
    let response: any = await this.afs.collection('users');
    return response;
  }

  public async updateHeroFirstTime(hero: Hero){
    try 
    {
      const userRef: AngularFirestoreDocument<Hero> = this.afs.doc(`hero/${hero.uid}`);
      
      const data: Hero = {
        uid: hero.uid,
        email: hero.email,
        name: hero.name,
        atk: hero.atk,
        def: hero.def,
        life: hero.life,
        exp: hero.exp,
        lvl: hero.lvl,
        active: hero.active
      };

      return userRef.set(data, { merge: true });
  }
    catch (error) 
    {
        console.log('ERROR: ', error);
    }
  }

}