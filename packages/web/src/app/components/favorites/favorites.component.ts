import { CommonModule } from '@angular/common';
import { OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRatingOptions, NgxStarsRatingModule } from 'ngx-stars-rating';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/core/services/wish-list.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, NgxStarsRatingModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  constructor(
    private _WishListService: WishListService,
    private spinner: NgxSpinnerService,
    private _Renderer: Renderer2,
    private _Toaster: ToastrService,
    public _Translate: TranslateService
  ) {}

  // all products
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myProducts: any = [];
  productId: string = '';

  //start Rating
  public rateNumber: number = 3;
  public ratingOptions: IRatingOptions = {
    starsCount: 5,
    hoverable: false,
    clickable: false,
  };

  //end Rating

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

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  // remove favorite icone
  removeFavoriteIcon(productId: string): void {
    this.productId = productId;
    console.log(this.productId);
  }

  // delete my favorite product
  deletePoductInWishList(): void {
    this.spinner.show();
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

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}
