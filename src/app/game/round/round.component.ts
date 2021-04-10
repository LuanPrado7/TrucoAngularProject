import { Component, Input, AfterContentInit, OnInit } from '@angular/core';
import { TeamEnum } from 'src/shared/enums/Team.enum';
import { Card } from '../card-deck/card-deck';
import { CardDeckService } from '../card-deck/services/card-deck.service';
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
  firstPlayerOfTheTurn: Player;
  roundScore: Array<string>;
  currentTurn: number;
  
  constructor(
    private cardDeckService: CardDeckService
  ) { 
    this.nPlayers = 4;
  }

  get TeamEnum() {
    return TeamEnum;
  }

  ngOnInit () {
    this.startNewRound();
  }

  startNewRound(firstPlayerOfTheTurn?: Player) : void {
    this.currentTurn = 1;
    this.vira = this.defineVira();
    this.cardDeckService.setValueManilhas(this.cardDeck, this.vira);
    this.distributeCards(this.nPlayers);

    this.startNewTurn(firstPlayerOfTheTurn);
  }

  startNewTurn(firstPlayerOfTheTurn?: Player) : void {
    this.players = this.players.map(player => {
      player.playedCard = null;
      return player;
    });

    this.firstPlayerOfTheTurn = this.defineFirstPlayerOfTheTurn(firstPlayerOfTheTurn); 
    this.playerTurn = this.firstPlayerOfTheTurn;
  }

  defineFirstPlayerOfTheTurn(player?: Player) : Player {
    if(player) return player;
    return this.players.find(p => p.position == 1);
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

  playerPlayCard(card: Card) {    
    this.playerTurn.playedCard = card;

    this.nextPlayer();
  }

  nextPlayer() {
    let indexCurrentPlayer = this.players.findIndex(p => p.position == this.playerTurn.position);

    let playerTurn = this.players[(indexCurrentPlayer + 1) % this.players.length];

    if(this.checkIfTheTurnIsOver(playerTurn)) {
      this.endTurn();      
    } else {
      this.playerTurn = playerTurn;
    }
  }

  endTurn() {
    let playerWhoWonRound = this.checkWhoWonTurn();

    if(!playerWhoWonRound) console.log("Empate");
    else if(playerWhoWonRound.team == TeamEnum.Blue) console.log("Ponto para o time azul");
    else console.log("Ponto para o time vermelho");
    
    if(this.currentTurn == 3) {
      this.startNewRound();    
    } else {
      this.currentTurn++;
      this.startNewTurn(playerWhoWonRound);
    }
  }

  checkWhoWonTurn() : Player {
    let roundTied : boolean = false;
    let playerWhoWon: Player = null;

    this.players.forEach(player => {
      if(!playerWhoWon) {
        playerWhoWon = player;
      } else if (player.playedCard.value === playerWhoWon.playedCard.value && player.team !== playerWhoWon.team) {
        roundTied = true;
      } else if(player.playedCard.value > playerWhoWon.playedCard.value) {
        roundTied = false;
        playerWhoWon = player;
      }
    });

    if(roundTied) return null;
    return playerWhoWon;
  }

  checkIfTheTurnIsOver(playerTurn : Player) : boolean {
    return playerTurn == this.firstPlayerOfTheTurn;
  }
}
