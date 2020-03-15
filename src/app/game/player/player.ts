import { Card } from '../card-deck/card-deck';

export class Player {
    id?: number;
    name?: string;
    avatar?: string;
    position?: number;
    hand?: Card[];
    playedCard?: Card;
}
