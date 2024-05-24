import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.css']
})
export class NavAuthComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){}

  signOut:boolean = this._AuthService.signOut;
  removeTokenSignOut():void{
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }
}

