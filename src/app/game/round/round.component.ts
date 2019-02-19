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
    this.nPlayers = 4;
    this.playersHand = [];
  }

  ngOnInit () {
    this.vira = this.defineVira();
    this.increaseValueShackles(this.vira);
    this.distributeCards(this.nPlayers);
  }

  defineVira(): Card {
    return this.cardDeck.splice(Math.floor(Math.random() * this.cardDeck.length), 1)[0];
  }

  distributeCards(nPlayer): void {    

    for(let i = 0; i < nPlayer; i++) {
    	let playerHand: Card[] = [];

      for(let j = 0; j < 3; j++) {
        let indexCard = Math.floor(Math.random() * this.cardDeck.length);
        playerHand.push(this.cardDeck[indexCard]);
        this.cardDeck.splice(indexCard, 1);
      }

      this.playersHand.push(playerHand);
    }
  }

  increaseValueShackles(vira): void {
    
    this.cardDeck.forEach((card, i) => {
      if(card.value == ((vira.value % 10) + 1)) 
        card.value = card.suit == 'P' ? 21 : (
          card.suit == 'E' ? 22 : (
            card.suit == 'C' ? 23 : 24
          )
        );
    });
  }

}
