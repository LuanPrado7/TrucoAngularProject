import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../card-deck/card-deck';
import { Player } from '../../player/player';

@Component({
  selector: 'hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {

  @Input() player: Player;
  @Input() isPlayerTurn: boolean;
  @Output() playedCard = new EventEmitter<Card>();

  handSum: number;
  handLevel: HandLevel;

  constructor() { }

  ngOnInit() {
    this.handSum = this.player.hand.reduce((prev, card) => prev + card.value, 0);
    this.handLevel = this.determineHandLevel(this.handSum);
  }

  determineHandLevel(handSum): HandLevel {
    let handLevel: HandLevel[] = [
      {
        label: 'Very Bad',
        level: 0,
        range: [3, 9]
      },
      {
        label: 'Bad',
        level: 1,
        range: [10, 15]
      },
      {
        label: 'Normal',
        level: 2,
        range: [16, 22]
      },
      {
        label: 'Good',
        level: 3,
        range: [23, 32]
      }, {
        label: 'Very Good',
        level: 4,
        range: [33, 42]
      },
      {
        label: 'God',
        level: 5,
        range: [43, 72]
      }
    ]
      
    return handLevel.find(level => handSum >= level.range[0] && handSum <= level.range[1]);
  }

  playCard(card: Card): void {
    if(this.isPlayerTurn) {
      this.player.hand.splice(this.player.hand.findIndex(c => c.number == card.number && c.suit == card.suit), 1);
      this.playedCard.emit(card);
    }
  }
}

export class HandLevel{
  label: string;
  level: number;
  range: number[];
}