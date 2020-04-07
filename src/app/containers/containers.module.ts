import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { CardsComponent } from './cards/cards.component';
import { TableComponent } from './table/table.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { TeamSelectionComponent } from './team-selection/team-selection.component';

@NgModule({
  declarations: [
    CardsComponent,
    TableComponent,
    TeamSelectionComponent,
    GameComponent,
    MessagesComponent,
    ScoreboardComponent
  ],
  exports: [
    CardsComponent,
    TableComponent,
    TeamSelectionComponent,
    GameComponent,
    MessagesComponent,
    ScoreboardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class ContainersModule {}
