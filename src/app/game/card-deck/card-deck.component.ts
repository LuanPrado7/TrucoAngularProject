import { Component } from '@angular/core';
import { Card } from './card-deck';

@Component({
  selector: 'card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.scss']
})
export class CardDeckComponent {

  cardNumbers: string[] = ['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3'];
  cardSuits: string[] = ['P', 'E', 'C', 'Z'];

  constructor() { }

  getCardDeck(): Card[] {
    return this.organizeDeck(this.cardNumbers, this.cardSuits);
  }

  organizeDeck(cardNumbers, cardSuits): Card[] {    
    let deck: Card[] = [];

    cardNumbers.forEach((number, i) => {
       cardSuits.forEach((suit, j) => {
         let card = new Card();
         card = {
           number: number,
           suit: suit,
           value: i + 1,
           imgSrc: 'assets/cards/' + (number + suit) + '.png'
         }

         deck.push(card);
       });
    });
    
    return deck;
  }
}
