import { Component, Input, AfterContentInit, OnInit } from '@angular/core';
import { Card } from '../card-deck/card-deck';

@Component({
  selector: 'round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit  {
  
  @Input() cardDeck: Card[];
  vira: Card;
  nPlayers: number;
  playersHand: Array<Card[]>;
  
  constructor() { 
    this.nPlayers = 2;
    this.playersHand = [];
  }

  ngOnInit () {
     this.distributeCards(this.nPlayers, this.cardDeck);
  }

  distributeCards(nPlayer, cardDeck): void {    
    for(let i = 0; i < nPlayer; i++) {
      let playerHand: Card[] = [];

      for(let j = 0; j < 3; j++) {
        let indexCard = Math.floor(Math.random() * cardDeck.length);
        playerHand.push(cardDeck[indexCard]);
        cardDeck.splice(indexCard, 1);
      }

      this.playersHand.push(playerHand);
    }

    this.vira = cardDeck.splice(Math.floor(Math.random() * cardDeck.length), 1)[0];
  }

}
