import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CardDeckComponent } from './card-deck/card-deck.component';
import { Card } from './card-deck/card-deck';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit  {

  constructor() { }

  @ViewChild (CardDeckComponent) cardDeckComp: CardDeckComponent;
  cardDeck: Card[] = [];
  
  ngOnInit () {
      this.cardDeck = this.cardDeckComp.getCardDeck();
  }

}
