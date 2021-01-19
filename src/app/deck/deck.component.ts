import { Component, OnInit } from '@angular/core';
import { Cards, AllCards } from '../shared/models/cards.interFace';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  constructor(private _CardsService: CardsService) { }

  collectionCards: {} = AllCards;
  objCards: Cards = {
    card1 : {
      name:"card1",
      atk: 0,
      def: 0,
      lvl: 0,
      life: 0
    },
    card2 : {
      name:"card2",
      atk: 0,
      def: 0,
      lvl: 0,
      life: 0
    },
  }

  ngOnInit() {
    console.log(this.collectionCards);
    // this.objcfalcon = this.objAllCards.cfalcon;
    // this.objAllCards.cfalcon;
  }

  selectDeck(){
      // console.log(AllCards[0].name);
      this.objCards.card1.name = AllCards[0].name;
      this.objCards.card1.atk = AllCards[0].atk;
      this.objCards.card1.def = AllCards[0].def;
      this.objCards.card1.lvl = AllCards[0].lvl;
      this.objCards.card1.life = AllCards[0].life;
      // this.objCards.card1.name = All
      this._CardsService.exampleCreate(this.objCards);
      // console.log('%c Guardado! ', 'background: #222; color: #bada55');
  }

}
