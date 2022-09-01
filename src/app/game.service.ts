import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public is501toggled: boolean = false;
  public scoreStack: number[][] = new Array();
  public playStarted: boolean = false;

  constructor(private router: Router) {
    this.scoreStack = new Array();
   }

  public is501(): boolean {
    return this.is501toggled;
  }

  public getScoreStack(): number[][] {
    return this.scoreStack;
  }

  public addScores(scoreHit: number[]): void {
    this.scoreStack.push(scoreHit);
    console.log(this.scoreStack);
  }

  public setScores(scores: number, playerNum: number): void {
    let arr: number[] = new Array(playerNum);
    for (let i: number = 0; i < playerNum; i++)
    {
      arr[i] = scores;
    }
    this.scoreStack.push(arr);
    console.log(this.scoreStack);
  }

  public newGame(): void {
    this.is501toggled = false;
    this.router.navigateByUrl('dashboard');
  }

  public startGame(): void {
    this.playStarted = true;
  }

  public isPlayStarted(): boolean {
    return this.playStarted;
  }

  public checkMinLimit(playerNum: number): boolean {
    let checked: boolean = true;
    if (playerNum <= 1)
    {
      checked = false;
      alert("Min. player: 2");
    }
    return checked;
  }
}
