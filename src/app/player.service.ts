import { Injectable } from '@angular/core';
import { players } from './players';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public is501: boolean = false;
  private playerArray: players[] = new Array();
  getPlayers(): players[] {
    return this.playerArray;
  }

  public addPlayer(player: players): void {
    if (this.playerArray.length <= 3)
    {
      this.playerArray.push(player);
    }
    else
    {
      alert("Макс. кол-во игроков: 4");
    }
  }

  public deletePlayer(playerID: number): void {
    this.playerArray.splice(playerID, 1);
  }

  public setScores(index: number, scoreNum: number): void {
    this.playerArray[index].score = scoreNum;
  }

  public hitScore(index: number, scoreNum: number): void {
    if (this.playerArray[index].score)
    {
      this.playerArray[index].score -= scoreNum;
    }
  }

  constructor() { 
    let playa: players = new players;
    playa.name="Max";
    playa.email="krup-m@gmail.com";
    let playa2: players = new players;
    playa2.name="Kirill";
    playa2.email="Kirill-m@gmail.com";
    this.addPlayer(playa);  
    this.addPlayer(playa2);
  }
}
