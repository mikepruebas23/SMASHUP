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
  limitCard = [];

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
    this.refreshMyDeck(1);
    this.refreshMyHand();
    
  }

  refreshMyDeck(value, index?){
    //get my all cards
    if(value == 1){
      this._DeckService.getAllDeck().then(res => {
        res.valueChanges().subscribe( response => {
          // console.log(response);
            this.collectionCards = response;
            this.fillBar(this.collectionCards);
        })
      });
    }
    else {
      this._DeckService.getAllDeck().then(res => {
        res.valueChanges().subscribe( response => {
          // console.log(response);
            this.collectionCards = response;
            this.limitCard.push(response);
            let card = this.collectionCards[index];

            this._CardsService.selectToMyHand(card);

        })
      });
    }
  }

  refreshMyHand(){
    let collection = this._CardsService.getAllCards().then(res => {
      res.valueChanges().subscribe( response => {
        this.myDeck = response;
      })
    }); 
  }
  fillBar(data){
    let barr = document.getElementById('barr'); 
    // console.log("FILL BAR: ",data);
    console.log(barr);
    let limit = 20;
    let percent1 = 100 / limit * limit;
    // bar.style.width =  percent1 + '%';
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

    if(this.myDeck.length <= 4){

      this._CardsService.selectToMyHand(i);
    }
    else {
      this.showMesagge("Your hand is full!");
    }
  }

  //delete card from hand
  removeCardFromHand(index){
    let i = this.myDeck[index];
    this._CardsService.removeCardFromHand(i);
  }

  checkUpgradeCard(index){
    let card = this.collectionCards[index];
    let stock = this.collectionCards[index].stock;
    let evolve = this.collectionCards[index].evolve;
    
    if(stock >= evolve){
      this._DeckService.updateLevelCard(card);
      this.refreshMyDeck(2, index);
    }
    else {
      this.showMesagge("cant Upgrade");
    }
  }

  showMesagge(messagge: string){
    console.log(messagge);
  }
}
