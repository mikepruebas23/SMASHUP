import { Component, OnInit, ViewChild } from '@angular/core';
import { Cards, AllCards } from '../shared/models/cards.interFace';
import { CardsService } from '../services/cards.service';
import { DeckService } from '../services/deck.service';
import { ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {


  constructor(
    @Inject(DOCUMENT) document,
    private _CardsService: CardsService,
    private _DeckService: DeckService) { }

  collectionCards: {};
  myDeck :any =[];
  index: number;

  objCards: Cards = {
    card1 : {
      name:"card1",
      atk: 0,
      def: 0,
      lvl: 0,
      life: 0,
      type: 'normal',
      price: 0,
      evolve: 0,
      stock: 0
    },
    card2 : {
      name:"card2",
      atk: 0,
      def: 0,
      lvl: 0,
      life: 0,
      type: 'normal',
      price: 0,
      evolve: 0,
      stock: 0
    },
  }

  ngOnInit() {
    //get my all cards
    this._DeckService.getAllDeck().then(res => {
      res.valueChanges().subscribe( response => {
        // console.log(response);
          this.collectionCards = response;
      })
    }); 
    
    //get my Deck
    this._CardsService.getAllCards().then(res => {
      res.valueChanges().subscribe( response => {
        console.log(response);
        // let i;
        // for(i=0; i<= response[0].length; i++){
        //   console.log(response[0]);
        //   this.myDeck.push(response[0][i]);
        //   console.log(this.myDeck);
        // }
        this.myDeck = response;
      })
    }); 

    // console.log( this.myDeck[0]);
  }

  // selectDeck(){
  //     // console.log(AllCards[0].name);
  //     this.objCards.card1.name = AllCards[0].name;
  //     this.objCards.card1.atk = AllCards[0].atk;
  //     this.objCards.card1.def = AllCards[0].def;
  //     this.objCards.card1.lvl = AllCards[0].lvl;
  //     this.objCards.card1.life = AllCards[0].life;
  //     // this.objCards.card1.name = All
  //     this._CardsService.exampleCreate(this.objCards);
  //     // console.log('%c Guardado! ', 'background: #222; color: #bada55');
  // }

  //carta seleccionada.
  ISCARDSELECT: boolean = false;
  pickCard(e){
    this.ISCARDSELECT = !this.ISCARDSELECT;

    if(this.ISCARDSELECT){
      let ele = document.getElementById(e.srcElement.id);
      console.log(e);
      ele.classList.add("card-select");
    }
  }

  selectSpotCard(spot){
    // switch(spot){
    //   case 1:

    //   break;
    // }
    let onElement =  spot.srcElement.id; 

    let myDeckList = document.getElementById('myDeckList'); 
    let i;
    
    for(i =0; i < 5; i++){
      let listElement = myDeckList.children[i].attributes[0].ownerElement.id;
      if( listElement == onElement){
        document.getElementById(listElement).classList.add("card-select");
      }
      else {
        document.getElementById(listElement).classList.remove("card-select");
      }
    }
  }


  changeCard(index){
    this.index = index;
    let i = this.collectionCards[index];
    let id = i.id;
    let stock = i.stock

    console.log(i);
    this._CardsService.selectToMyHand(i);
  }
}
