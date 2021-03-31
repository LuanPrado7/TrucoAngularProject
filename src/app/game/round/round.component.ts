import { Component, Input, AfterContentInit, OnInit } from '@angular/core';
import { TeamEnum } from 'src/shared/enums/Team.enum';
import { Card } from '../card-deck/card-deck';
import { Player } from '../player/player';

@Component({
  selector: 'round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit  {
  
  @Input() cardDeck: Card[];
  @Input() players: Array<Player>;
  @Input() nPlayers: number;

  vira: Card;
  playerTurn: Player;
  
  constructor() { 
    this.nPlayers = 4;
  }

  ngOnInit () {
    this.vira = this.defineVira();
    this.increaseValueShackles(this.vira);
    this.distributeCards(this.nPlayers);

    this.playerTurn = this.players.find(p => p.position == 1);
  }

  get TeamEnum() {
    return TeamEnum;
  }

  defineVira(): Card {
    return this.cardDeck.splice(Math.floor(Math.random() * this.cardDeck.length), 1)[0];
  }

  distributeCards(nPlayer): void {  
    for(let i = 1; i <= nPlayer; i++) {
      let hand: Card[] = [];

      for(let j = 0; j < 3; j++) {
        let indexCard = Math.floor(Math.random() * this.cardDeck.length);

        hand.push(this.cardDeck[indexCard]);
       
        this.cardDeck.splice(indexCard, 1);
      }

      this.players[i - 1].position = i;
      this.players[i - 1].hand = hand;
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
