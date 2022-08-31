import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InputWindowComponent } from './input-window/input-window.component';
import { PlayersComponent } from './players/players.component';
import { AppRoutingModule } from './app-routing.module';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { GameComponent } from './game/game.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, InputWindowComponent, PlayersComponent, ChooseGameComponent, GameComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
