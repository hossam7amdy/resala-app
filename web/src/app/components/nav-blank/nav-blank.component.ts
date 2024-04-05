import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) {}
  signOut: boolean = this._AuthService.signOut;

  removeTokenSignOut(): void {
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }
}
