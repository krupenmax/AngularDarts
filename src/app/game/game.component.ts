import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { players } from '../players';
import { GameService } from '../game.service';
import { FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public players: players[];
  public playerCount: number;
  public index: number = 0;  
  public scoreNum: number[][] = new Array();
  public profileForm = this.fb.group({
    inputId: [],
    scoreNum: [],
    aliases: this.fb.array([])
  });

  public trackByIndex(index: number, obj: any): any {
    return index;
  }

  public get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  public addAlias(i: number) {
    this.aliases.push(this.fb.control(i));
  }

  public show(i: number): number {
    return this.aliases.controls[0].value;
  }

  
  

  public scoreHit = new FormControl(0);

  public x1Array: boolean[][];
  public x2Array: boolean[][];
  public x3Array: boolean[][];
  
  public scoreStack: number[][];

  public moveCount: number = 0;
  constructor(private playerService: PlayerService, private gameService: GameService, private fb: FormBuilder) {
    this.players = new Array();
    this.getPlayers();
    for (let i: number = 0; i < this.players.length; i++)
    {
        this.addAlias(i);
    }

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
    }
    else
    {
      for (let i: number = 0; i < this.playerCount; i++)
      {
        this.setPlayerScores(i, 301);
      }
    }
    this.getPlayers();
    this.scoreStack = this.getScoreStack();

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

  public hitScore(index: number, score: number) {
  }

  ngOnInit(): void {
  }

}
