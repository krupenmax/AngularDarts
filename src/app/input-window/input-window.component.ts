import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { players } from '../players';
import { PlayerService } from '../player.service';
@Component({
  selector: 'app-input-window',
  templateUrl: './input-window.component.html',
  styleUrls: ['./input-window.component.css']
})
export class InputWindowComponent implements OnInit {
  public nickname: string = "";
  public email: string = "";
  constructor(private service: PlayerService, private router: Router) { }

  public addPlayer(): void 
  {
    if (this.email != "" && this.nickname != "")
    {
      let player = new players;
      player.email = this.email;
      player.name = this.nickname;
      this.service.addPlayer(player);
      this.router.navigateByUrl('/dashboard');
    }
  }
  ngOnInit(): void {
  }

}
