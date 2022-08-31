import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-choose-game',
  templateUrl: './choose-game.component.html',
  styleUrls: ['./choose-game.component.css']
})
export class ChooseGameComponent implements OnInit {
  
  public is501toggled: boolean = true;
  constructor(private router: Router, private gameService: GameService) {
    this.gameService.is501toggled = true;
   }
  

  public pick501Mode(): void {
    this.is501toggled = true;
    this.gameService.is501toggled = true;
  }

  public pick301Mode(): void {
    this.is501toggled = false;
    this.gameService.is501toggled = false;
  }

  public startGame(): void {
    this.router.navigateByUrl('game');
  }

  ngOnInit(): void {
  }

}
