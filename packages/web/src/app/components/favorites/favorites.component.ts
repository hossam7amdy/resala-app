import { CommonModule } from '@angular/common';
import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IRatingOptions, NgxStarsRatingModule } from 'ngx-stars-rating';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, NgxStarsRatingModule, SpinnerComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit,OnDestroy {
  constructor(
    private _WishListService: WishListService,
    private _Toaster: ToastrService,
    public _Translate: TranslateService
  ) {}
  
  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner

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
  
  //Subscription ID
  getAllMyProductsId!:Subscription;

  ngOnInit(): void {
    this.customSpinIsLoading = true;

    this.getAllMyProductsId = this._WishListService.getAllMyProducts().subscribe({
      next: response => {
        this.myProducts = response.data;

        this.customSpinIsLoading = false;
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });
  }
  //Destroy Subscription
  ngOnDestroy(): void {
    if (this.getAllMyProductsId)this.getAllMyProductsId.unsubscribe()
  }
  // remove favorite icone
  removeFavoriteIcon(productId: string): void {
    this.productId = productId;
  }

  // delete my favorite product
  deletePoductInWishList(): void {
    this.customSpinIsLoading = true;
    this._WishListService.deleteMyFavoriteProduct(this.productId).subscribe({
      next: response => {
        this.myProducts = response.data;
        this._Toaster.success('Removed Successfully');
        // window.location.reload();

        this.customSpinIsLoading = false;
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });
  }
}
