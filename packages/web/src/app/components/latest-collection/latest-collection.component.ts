import { CommonModule } from '@angular/common';
import { OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ListProductsResponse } from '@resala/shared';
import { NgxStarsRatingModule } from 'ngx-stars-rating';
import { IRatingOptions } from 'ngx-stars-rating';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { ReviewsService } from 'src/app/core/services/reviews.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-latest-collection',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxStarsRatingModule, TranslateModule, SpinnerComponent],
  templateUrl: './latest-collection.component.html',
  styleUrls: ['./latest-collection.component.css'],
})
export class LatestCollectionComponent implements OnInit, OnDestroy {
  constructor(
    private _HomeProductsService: HomeProductsService,
    private _WishListService: WishListService,
    private _Toaster: ToastrService,
    private _Router: Router,
    private _Renderer: Renderer2,
    private _Reviews: ReviewsService,
    public _Translate: TranslateService
  ) {}

  UserProfile: any;
  userNameLogged: any;
  productId: string = '';

  customSpinIsLoading = false;

  public rateNumber: number = 2;
  public ratingOptions: IRatingOptions = {
    starsCount: 5,
    hoverable: false,
    clickable: false,
  };

  products: ListProductsResponse['data']['products'] = [];

  imgPlaceHolder: string = '';

  currentProduct: any;

  // Supscription ID
  getProductsId!: Subscription;
  getProductReviewId!: Subscription;

  ngOnInit(): void {
    this.customSpinIsLoading = true;
    this.getProductsId = this._HomeProductsService.getProducts('1', '20').subscribe({
      next: response => {
        this.products = response.data.products;
        this.customSpinIsLoading = false;
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });

    //Reviews
    this.getProductReviewId = this._Reviews.getProductReview('1', '100').subscribe({
      next: res => {
        this.rateNumber = res.data.reviews.at(0)?.rating || 5;
        this.customSpinIsLoading = false;
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });
  }
  ngOnDestroy(): void {
    if (this.getProductsId) this.getProductsId.unsubscribe();
    if (this.getProductReviewId) this.getProductReviewId.unsubscribe();
  }

  //Add product in Wish list method
  addPoductInWishList(id: any, element: HTMLElement): void {
    this.customSpinIsLoading = true;
    this._WishListService.postWishListItems(id).subscribe({
      next: () => {
        this.customSpinIsLoading = false;
        this._Renderer.setStyle(element, 'font-weight', 'bold');
        this._Toaster.success('Added in Your Favorite List');
      },
      error: e => {
        this.customSpinIsLoading = false;
        const errMsg = e?.error?.message || 'Something went wrong';
        this._Toaster.error(errMsg);
      },
    });
  }
}
