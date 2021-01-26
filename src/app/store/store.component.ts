import { Component, OnInit } from '@angular/core';
import { Cards, AllCards } from '../shared/models/cards.interFace';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private _DeckService: DeckService) { }

  collectionCards: {};

  card = {
    atk: 1,
    def: 1,
    evolve: 1,
    id:"KEN",
    life: 1,
    lvl: 1,
    name: "KEN",
    price: 0,
    stock: 2,
    type: 'normal'
  }

  ngOnInit() {
    this._DeckService.getAllStore().then(res => {
      res.valueChanges().subscribe( response => {
          this.collectionCards = response;
      })
    });    
  }

  createANormalCard(){
    this._DeckService.createCard(this.card);
  }

  async buyCard(index){

    let i = this.collectionCards[index];
    let id = i.id;
    let stock = i.stock

    if(stock >= 1){
      try{
        // console.log(i);
        await this._DeckService.buyCard(i);
        await this._DeckService.updateStore(id, stock);
      }
      catch(error){
        console.log(error);
      }
    }
    else {
      console.log('%c Empty Stock! ', 'background: #222; color: #bada55');
    }
    
  }

}
