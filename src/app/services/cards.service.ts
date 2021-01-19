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
  
    ID = '8TbeeHigBXhqfKTrV1cNyQfZhwr2';

  //CREATE
  public async exampleCreate(data){
    try{

      await this.afs.collection(this.COLLECTION).doc(this.ID).set(data);
      console.log('%c Guardado! ', 'background: #222; color: #bada55');
    }
    catch(error){
      console.log(error);
    }
  }
//   exampleCreate(data){ 
//     return new Promise<any>((resolve, reject) => { 
//        this.afs.doc(this.ID)
//            .collection("cards")
//            .add(data)
//            .then(
//                res => {return res}, 
//                err => reject(err)
//            )
//     }
//  )}
}