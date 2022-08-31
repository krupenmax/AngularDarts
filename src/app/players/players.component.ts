import { Component, Injectable, OnInit } from '@angular/core';
import { players } from '../players';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class PlayersComponent implements OnInit {
  public players: players[];

  constructor(private readonly cdr$: ChangeDetectorRef, private playerService: PlayerService, private router: Router) {
    this.players = new Array();
  }

  public getPlayers(): void {
    this.players = this.playerService.getPlayers();
  }

  public goBack(): void {
    this.router.navigateByUrl('');
  }

  public deletePlayer(playerID: number): void {
    this.playerService.deletePlayer(playerID);
    this.getPlayers();
    this.cdr$.detectChanges();
  }

  ngOnInit(): void {
    this.getPlayers();
  }

}
