import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Cards } from '../shared/models/cards.interFace';

@Injectable({providedIn: 'root'})

export class CardsService   {
  
  COLLECTION: string = 'cards';
  constructor(
      public afAuth: AngularFireAuth,
      private afs: AngularFirestore
    ) { }
  

  //CREATE
  // public async createCodeFriend(ID: string){
  //     await this.afs.collection(this.COLLECTION).doc(ID).set({
  //         valid: true,
  //     });
  // }

  exampleCreate(data){ 
    return new Promise<any>((resolve, reject) => { 
       this.afs
           .collection("cards")
           .add(data)
           .then(
               res => {return res}, 
               err => reject(err)
           )
    }
 )}
}