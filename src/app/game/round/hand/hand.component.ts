import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../card-deck/card-deck';

@Component({
  selector: 'hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {

  @Input() playerHand: Card[];

  constructor() { }

  ngOnInit() {
  }

}
