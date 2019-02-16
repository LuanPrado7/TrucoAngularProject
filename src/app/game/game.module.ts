import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { ViraComponent } from './round/vira/vira.component';
import { HandComponent } from './round/hand/hand.component';
import { ActionComponent } from './round/action/action.component';

@NgModule({
  declarations: [PlayerComponent, ViraComponent, HandComponent, ActionComponent],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
