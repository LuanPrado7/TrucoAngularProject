import { Component, Input, AfterContentInit, OnInit } from '@angular/core';
import { Card } from '../card-deck/card-deck';

@Component({
  selector: 'round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit  {

  constructor() { }

  @Input() cardDeck: Card[];
  vira: Card;

  ngOnInit () {
    
  }

}
