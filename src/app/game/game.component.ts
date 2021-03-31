import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CardDeckComponent } from './card-deck/card-deck.component';
import { Card } from './card-deck/card-deck';
import { Player } from './player/player';
import { TeamEnum } from 'src/shared/enums/Team.enum';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit  {
  
  players: Array<Player>;
  nPlayers: number;

  @ViewChild (CardDeckComponent) cardDeckComp: CardDeckComponent;
  cardDeck: Card[] = [];
  
  constructor() {
    this.players = new Array<Player>();
    this.nPlayers = 4;
  }
 
  ngOnInit () {
      this.cardDeck = this.cardDeckComp.getCardDeck();
      this.setPlayers();
  }

  setPlayers() {    
    for(let i = 1; i <= this.nPlayers; i++) {
      this.players.push({
        id: i,         
        name: `Player ${i}`,
        team: i % 2 ? TeamEnum.Blue : TeamEnum.Red
      });
    }
  }
}
