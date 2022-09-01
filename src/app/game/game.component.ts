import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { players } from '../players';
import { GameService } from '../game.service';
import { FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public players: players[];
  public playerCount: number;
  public index: number = 0;  
  public scoreNum: number[][] = new Array();

  public x1Array: boolean[][];
  public x2Array: boolean[][];
  public x3Array: boolean[][];
  

  public moveCount: number = 0;
  constructor(private playerService: PlayerService, private gameService: GameService, private fb: FormBuilder, private cdr$: ChangeDetectorRef) {
    this.players = new Array();
    this.getPlayers();
    for (let i: number = 0; i < this.players.length; i++)
    {
        this.scoreNum[i] = new Array();
    }
    
    this.playerCount = this.players.length;
    if (this.gameService.is501())
    {
      for (let i: number = 0; i < this.playerCount; i++)
      {
        this.setPlayerScores(i, 501);
      }
      this.gameService.setScores(501, this.playerCount);
    }
    else
    {
      for (let i: number = 0; i < this.playerCount; i++)
      {
        this.setPlayerScores(i, 301);
      }
      this.gameService.setScores(301, this.playerCount);
    }
    this.getPlayers();

    this.x1Array = new Array(this.playerCount);
    for (let i: number = 0; i < this.playerCount; i++)
    {
        this.x1Array[i] = new Array(3);
    }
    for (let i: number = 0; i < this.playerCount; i++)
    {
      for (let j: number = 0; j < 3; j++)
      {
        this.x1Array[i][j] = true;
      }
    }
    
    this.x2Array = new Array(this.players.length);
    for (let i: number = 0; i < this.playerCount; i++)
    {
      this.x2Array[i] = new Array(3);
    }
    for (let i: number = 0; i < this.playerCount; i++)
    {
      for (let j: number = 0; j < 3; j++)
      {
        this.x2Array[i][j] = false;
      }
    }

    this.x3Array = new Array(this.players.length);
    for (let i: number = 0; i < this.playerCount; i++)
    {
      this.x3Array[i] = new Array(3);
    }
    for (let i: number = 0; i < this.playerCount; i++)
    {
      for (let j: number = 0; j < 3; j++)
      {
        this.x3Array[i][j] = false;
      }
    }
  }

  public getPlayers(): void {
    this.players = this.playerService.getPlayers();
  }

  public setPlayerScores(index: number, scoreNum: number): void {
    this.playerService.setScores(index, scoreNum);
  }

  public isX1(index: number, playerEntity: players): boolean {
    return this.x1Array[this.getIndexByPlayer(playerEntity)][index];
  }

  public isX2(index: number, playerEntity: players): boolean {
    return this.x2Array[this.getIndexByPlayer(playerEntity)][index];
  }

  public isX3(index: number, playerEntity: players): boolean {
    return this.x3Array[this.getIndexByPlayer(playerEntity)][index];
  }

  public pickX1(index: number, playerEntity: players): void {
    this.x1Array[this.getIndexByPlayer(playerEntity)][index] = true;
    this.x2Array[this.getIndexByPlayer(playerEntity)][index] = false;
    this.x3Array[this.getIndexByPlayer(playerEntity)][index] = false;
  }

  public pickX2(index: number, playerEntity: players): void {
    this.x1Array[this.getIndexByPlayer(playerEntity)][index] = false;
    this.x2Array[this.getIndexByPlayer(playerEntity)][index] = true;
    this.x3Array[this.getIndexByPlayer(playerEntity)][index] = false;
  }

  public pickX3(index: number, playerEntity: players): void {
    this.x1Array[this.getIndexByPlayer(playerEntity)][index] = false;
    this.x2Array[this.getIndexByPlayer(playerEntity)][index] = false;
    this.x3Array[this.getIndexByPlayer(playerEntity)][index] = true;
  }

  public getIndexByPlayer(playerEntity: players): number {
    let num: number = 0;
    for (let i: number = 0; i < this.playerCount; i++)
    {
      if (playerEntity == this.players[i])
      {
        num = i;
      }
    }
    return num;
  }

  public newGame(): void {
    this.gameService.newGame();
  }

  public getScoreStack(): number[][] {
    return this.gameService.getScoreStack();
  }

  public hitScore(): void {
    let checked: boolean = true;
    for (let i: number = 0; i < this.playerCount; i++)
    {
      for (let j: number = 0; j < 3; j ++)
      {
        if (this.scoreNum[i][j] == null)
        {
          checked = false;
          alert("Missing values");
          break;
        }
      }
    }
    if (checked)
    {
      for (let i: number = 0; i < this.playerCount; i++)
      {
        for (let j: number = 0; j < 3; j ++)
        {
          let multiplier: number = 0;
          if (this.x1Array[i][j] == true)
          {
            multiplier = 1;
          }
          if (this.x2Array[i][j] == true)
          {
            multiplier = 2;
          }
          if (this.x3Array[i][j] == true)
          {
            multiplier = 3;
          }
          
          this.playerService.hitScore(i, this.scoreNum[i][j] * multiplier);
        }
      }
      this.gameService.addScores(this.playerService.getScore());
      this.moveCount++;
      this.cdr$.detectChanges();
    }
  }

  ngOnInit(): void {
  }

}
