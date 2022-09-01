import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { players } from '../players';
import { PlayerService } from '../player.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-input-window',
  templateUrl: './input-window.component.html',
  styleUrls: ['./input-window.component.css']
})
export class InputWindowComponent implements OnInit {
  public nickname: string = "";
  public email: string = "";
  public myForm: FormGroup = new FormGroup({
    nickname: new FormControl(),
    email: new FormControl(),
  });
  constructor(private service: PlayerService, private router: Router, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      nickname: [''],
      email: [""],
    })
   }

  public addPlayer(): void 
  {
    if (this.email != "")
    {
      let player = new players;
      player.email = this.email;
      
      this.service.addPlayer(player);
      this.router.navigateByUrl('/dashboard');
    }
  }

  ngOnInit(): void {
    this.myForm.valueChanges.subscribe(console.log);
  }

}
