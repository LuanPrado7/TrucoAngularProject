import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../card-deck/card-deck';

@Component({
  selector: 'hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {

  @Input() playerHand: Card[];
  handSum: number;
  handLevel: HandLevel;

  constructor() { }

  ngOnInit() {
    this.handSum = this.playerHand.reduce((prev, card) => prev + card.value, 0);
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
      
    return handLevel.filter(level => handSum >= level.range[0] && handSum <= level.range[1])[0];
  }
}

export class HandLevel{
  label: string;
  level: number;
  range: number[];
}