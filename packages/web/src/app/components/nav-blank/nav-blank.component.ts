import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _CartService: CartService
  ) { }

  cartNum: number = 0;
  ngOnInit(): void {

    this._CartService.cartNumber.subscribe({
      next: (response) => {

        console.log('cart number', response)
        this.cartNum = response;
      }
    })

    this._CartService.getCartUser().subscribe({
      next: (response) => {
        this.cartNum = response.data.totalQuantity;
      }
    })
  }
  signOut: boolean = this._AuthService.signOut;

  //attributes
  onClick: boolean = true;
  removeTokenSignOut(): void {
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }

  closeOverlay() {
    this.onClick = false;
  }
}
