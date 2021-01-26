import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Cards } from '../shared/models/cards.interFace';

@Injectable({providedIn: 'root'})

export class DeckService  {
  
  COLLECTION_DECK: string = 'deck';
  COLLECTION_STORE: string = 'store';
  ID = '8TbeeHigBXhqfKTrV1cNyQfZhwr2';
  constructor(
      public afAuth: AngularFireAuth,
      private afs: AngularFirestore
    ) { }


  //CREATE
  public async createCard(data){
    await this.afs.collection(this.COLLECTION_STORE).doc(data.id).set(data);
    console.log('%c Created! ', 'background: #222; color: #bada55');
  }

  //buy card
  public buyCard(data){
    let collection = this.afs.collection(this.COLLECTION_DECK).doc(this.ID).collection(this.COLLECTION_DECK).doc(data.id).snapshotChanges().subscribe(res => {
        collection.unsubscribe();
        if (res.payload.exists)
        {
          this.afs.collection(this.COLLECTION_DECK).doc(this.ID).collection(this.COLLECTION_DECK).doc(data.id).update({
              "stock": res.payload.data()['stock'] + 1,
          });

          console.log('%c Buyed', 'background: #222; color: #bada55');
        }
        else
        {
          this.afs.collection(this.COLLECTION_DECK).doc(this.ID).collection(this.COLLECTION_DECK).doc(data.id).set({
            atk: data.atk,
            def: data.def,
            evolve: data.evolve,
            id: data.id,
            life: data.life,
            lvl: data.lvl,
            name: data.name,
            price: data.price,
            stock: 1,
            type: data.type
          });

            console.log('%c Does not exist. will be added.! ', 'background: #222; color: #bada55');
        }
    });
    
  }
    
  //GET ALL card deck
  public async getAllDeck(){
    let response: any = await this.afs.collection(this.COLLECTION_DECK).doc(this.ID).collection(this.COLLECTION_DECK);
    return response;
  }

  //GET ALL Stored cards
  public async getAllStore(){
    let response: any = await this.afs.collection(this.COLLECTION_STORE);
    return response;
  }

  public async updateStore(id,stock){
    this.afs.collection(this.COLLECTION_STORE).doc(id).update({
        "stock": stock -1,
    });
  }

  public async updateDeckStock(id,stock){
    this.afs.collection(this.COLLECTION_DECK).doc(this.ID).collection(this.COLLECTION_DECK).doc(id).update({
        "stock": stock -1,
    });
  }

  //update lvl, stock, and evolve count.
  public async updateLevelCard(data){
    try{
      this.afs.collection(this.COLLECTION_DECK).doc(this.ID).collection(this.COLLECTION_DECK).doc(data.id).update({
        "evolve": data.evolve * 2,
        "lvl": data.lvl +1,
        "stock": data.stock - data.evolve,
      });
      console.log('%c Card Updated! ', 'background: #222; color: #bada55');
    }
    catch(error){
      console.log(error);
    }
  }
}