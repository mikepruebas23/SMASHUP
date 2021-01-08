import { Component, OnInit } from '@angular/core';
import { Cards } from '../shared/models/cards.interFace';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  constructor(private _CardsService: CardsService) { }

  objCards: Cards = {
    card1 : {
      name:"value",
      atk: 0,
      def: 0,
    },
    card2: "value"
  }

  ngOnInit() {
  }

  selectDeck(){
    this._CardsService.exampleCreate(this.objCards);
    console.log('%c Guardado! ', 'background: #222; color: #bada55');
  }

}
