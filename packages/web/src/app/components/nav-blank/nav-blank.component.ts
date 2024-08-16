import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';



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
    private _CartService: CartService,
    private _Categories:CategoriesService,
    private route:ActivatedRoute,
    
  
  ) {}

  // attributes
  categoryList:any=[];

  cartNum: number = 0;

  

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: response => {
        console.log('cart number', response);
        this.cartNum = response;
      },
    });

    this._CartService.getCartUser().subscribe({
      next: response => {
        this.cartNum = response.data.totalQuantity;
      },
      error: () => {},
    });

    this._Categories.getCategories().subscribe({
      next:(response)=>{
        this.categoryList = response.data;
      },error:(err)=>{
        console.log(err);
      }
    })
  }


  

  

  signOut: boolean = this._AuthService.signOut;

  removeTokenSignOut(): void {
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }
}
