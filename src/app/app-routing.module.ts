import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputWindowComponent } from './input-window/input-window.component';
import { PlayersComponent } from './players/players.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: '', component: InputWindowComponent },
  { path: 'dashboard', component: PlayersComponent},
  { path: 'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }