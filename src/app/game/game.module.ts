import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { HandComponent } from './round/hand/hand.component';
import { ActionComponent } from './round/action/action.component';
import { GameComponent } from './game.component';
import { RoundComponent } from './round/round.component';
import { CardDeckComponent } from './card-deck/card-deck.component';
import { ScoreComponent } from './score/score.component';

@NgModule({
  declarations: [
      PlayerComponent,
      HandComponent,
      ActionComponent,
      GameComponent,
      RoundComponent,
      CardDeckComponent,
      ScoreComponent
    ],
  imports: [
    CommonModule
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
