import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePageComponent } from 'src/app/pages/game-page/game-page.component';
import { JoinGamePageComponent } from 'src/app/pages/game-page/join-game-page.component';
import { CreateGamePageComponent } from 'src/app/pages/game-page/create-game-page.component';

const routes: Routes = [
  {
    path: 'join',
    component: JoinGamePageComponent,
  },
  {
    path: 'create',
    component: CreateGamePageComponent,
  },
  {
    path: ':id',
    component: GamePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamePageRoutingModule {}
