import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { GamePageComponent } from './game-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GamePageRoutingModule } from './game-page-routing.module';
import { ContainersModule } from 'src/app/containers/containers.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { JoinGamePageComponent } from 'src/app/pages/game-page/join-game-page.component';
import { CreateGamePageComponent } from 'src/app/pages/game-page/create-game-page.component';

@NgModule({
  declarations: [
    GamePageComponent,
    JoinGamePageComponent,
    CreateGamePageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    ContainersModule,
    FormsModule,
    ReactiveFormsModule,
    GamePageRoutingModule,
  ],
})
export class GamePageModule {}
