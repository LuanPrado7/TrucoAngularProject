import { Component, Input, AfterContentInit, OnInit } from '@angular/core';
import { Card } from '../card-deck/card-deck';
import { Player } from '../player/player';

@Component({
  selector: 'round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit  {
  
  @Input() cardDeck: Card[];
  vira: Card;
  nPlayers: number;
  players: Array<Player>;
  playerTurn: Player;
  
  constructor() { 
    this.nPlayers = 4;
    this.players = [];
  }

  ngOnInit () {
    this.vira = this.defineVira();
    this.increaseValueShackles(this.vira);
    this.distributeCards(this.nPlayers);

    this.playerTurn = this.players.find(p => p.position == 1);
  }

  defineVira(): Card {
    return this.cardDeck.splice(Math.floor(Math.random() * this.cardDeck.length), 1)[0];
  }

  distributeCards(nPlayer): void {  
    for(let i = 1; i <= nPlayer; i++) {
      let player: Player;
      let hand: Card[] = [];

      for(let j = 0; j < 3; j++) {
        let indexCard = Math.floor(Math.random() * this.cardDeck.length);

        hand.push(this.cardDeck[indexCard]);
       
        this.cardDeck.splice(indexCard, 1);
      }

      player = {
        position: i,
        hand: hand
      }

      this.players.push(player);
    }
  }

  increaseValueShackles(vira): void {
    this.cardDeck.forEach((card, i) => {
      if(card.value == ((vira.value % 10) + 1)) 
        card.value = 
          card.suit == 'P' ? 21 : (
            card.suit == 'E' ? 22 : (
              card.suit == 'C' ? 23 : 24
          )
        );
    });
  }

  playerPlayCard(card: Card) {
    this.playerTurn.playedCard = card;

    this.nextPlayer();
  }

  nextPlayer() {
    let indexCurrentPlayer = this.players.findIndex(p => p.position == this.playerTurn.position);

    this.playerTurn = this.players[(indexCurrentPlayer + 1) % this.players.length];
  }
}
