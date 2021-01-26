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
  public async selectToMyHand(data){
    try{

      // console.log(data);
      await this.afs.collection(this.COLLECTION).doc(this.ID).collection(this.COLLECTION).doc(data.id).set(data);
      // console.log('%c Guardado! ', 'background: #222; color: #bada55');
    }
    catch(error){
      console.log(error);
    }
  }

  //Get all cards
  public async getAllCards(){
    let response: any = await this.afs.collection(this.COLLECTION).doc(this.ID).collection(this.COLLECTION);
    return response;
  }

  //
  public async removeCardFromHand(data){
    this.afs.collection(this.COLLECTION).doc(this.ID).collection(this.COLLECTION).doc(data.id).delete();
  }

  //update lvl, stock, and evolve count.
  // public async updateLevelCard(data){
  //   try{
  //     this.afs.collection(this.COLLECTION).doc(this.ID).collection(this.COLLECTION).doc(data.id).update({
  //       "evolve": data.evolve * 2,
  //       "lvl": data.lvl +1,
  //       "stock": data.stock - data.evolve,
  //     });
  //     console.log('%c Card Updated! ', 'background: #222; color: #bada55');
  //   }
  //   catch(error){
  //     console.log(error);
  //   }
// }
}