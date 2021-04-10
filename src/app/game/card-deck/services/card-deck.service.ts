import { Injectable } from "@angular/core";
import { Card } from "../card-deck";

@Injectable({
    providedIn: 'root'
})
export class CardDeckService {
    constructor() {}

    setValueManilhas(cardDeck: Card[], vira: Card): Card[] {
        return cardDeck.map((card, i) => {
            if(card.value == ((vira.value % 10) + 1)) 
            card.value = 
                card.suit == 'P' ? 21 : (
                card.suit == 'E' ? 22 : (
                    card.suit == 'C' ? 23 : 24
                )
            );

            return card;
        });
    }


}