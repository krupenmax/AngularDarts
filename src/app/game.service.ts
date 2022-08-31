import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public is501toggled: boolean = false;
  public scoreStack: number[][] = new Array();
  constructor(private router: Router) {
      let arr: number[] = new Array(3);
      for (let i: number = 0; i < 3; i++)
      {
        arr[i] = i;
      }
      this.scoreStack.push(arr);
   }
  public is501(): boolean {
    return this.is501toggled;
  }

  public getScoreStack(): number[][] {
    return this.scoreStack;
  }

  public newGame(): void {
    this.is501toggled = false;
    this.router.navigateByUrl('dashboard');
  }
}
