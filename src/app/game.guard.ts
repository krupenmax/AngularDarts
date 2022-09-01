import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GameService } from './game.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.gameService.isPlayStarted())
      {
        this.router.navigateByUrl('dashboard');
        alert("Set players and game mode first");
      }
      return this.gameService.isPlayStarted();
  }
  constructor(private gameService: GameService, private router: Router) {

  }
}
