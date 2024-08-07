import { CommonModule } from '@angular/common';
import type { OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { NgxSpinnerService } from 'ngx-spinner';
import type { ToastrService } from 'ngx-toastr';
import type { WishListService } from 'src/app/core/services/wish-list.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  constructor(
    private _WishListService: WishListService,
    private spinner: NgxSpinnerService,
    private _Renderer: Renderer2,
    private _Toaster: ToastrService
  ) {}

  // all products
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myProducts: any = [];
  productId: string = '';

  ngOnInit(): void {
    this.spinner.show();

    this._WishListService.getAllMyProducts().subscribe({
      next: response => {
        this.myProducts = response.data;

        console.log(response);
      },
      error: err => {
        console.log(err);
      },
    });

    this.spinner.hide();
  }
  // remove favorite icone
  removeFavoriteIcon(productId: string): void {
    this.productId = productId;
    console.log(this.productId);
  }

  // delete my favorite product
  deletePoductInWishList(): void {
    this._WishListService.deleteMyFavoriteProduct(this.productId).subscribe({
      next: response => {
        this._Toaster.success('Removed Successfully');
        window.location.reload();
        console.log(response, 'product id', this.productId);
      },
      error: err => {
        console.log(err);
      },
    });
  }
}
