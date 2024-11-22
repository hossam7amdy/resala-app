import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { IRatingOptions, NgxStarsRatingModule } from 'ngx-stars-rating';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';
import { CustomefillterPipe } from 'src/app/core/pipe/customefillter.pipe';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { Translate_Service } from 'src/app/core/services/translate.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    RouterLink,
    NgxPaginationModule,
    NgxStarsRatingModule,
    TranslateModule,
    CustomefillterPipe,
    SpinnerComponent,
  ],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  constructor(
    private _HomeProductsService: HomeProductsService,
    private _WishListService: WishListService,
    private _Toaster: ToastrService,
    private _Router: Router,
    private _Renderer: Renderer2,
    public _Translate: TranslateService,
    private _RTLStatus: Translate_Service
  ) {}

  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner

  // interfaces
  products: Product[] = [];

  //start Rating
  public rateNumber: number = 3;
  public ratingOptions: IRatingOptions = {
    starsCount: 5,
    hoverable: false,
    clickable: false,
  };

  //end Rating

  ngOnInit(): void {
    this.customSpinIsLoading = true;

    //  products
    this._HomeProductsService.getProducts().subscribe({
      next: response => {
        this.products = response.data.products;
        this.customSpinIsLoading = false;
        // this.rateNumber = response.data.products.avgRating;
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });
  }

  //Add product in Wish list method
  addPoductInWishList(id: any, element: HTMLElement): void {
    this.customSpinIsLoading = true;
    this._WishListService.postWishListItems(id).subscribe({
      next: () => {
        this._Renderer.setStyle(element, 'font-weight', 'bold');
        this._Toaster.success('Added in Your Favorite List');

        this.customSpinIsLoading = false;
      },
      error: () => {
        this._Toaster.error('Should be Login !!');
        this._Router.navigate(['/login']);
        // if (err.statusText == 'Unauthorized'|| err.error.message == 'JWT token is missing or invalid' || err.error.message == 'jwt expired') {

        // } else {
        //   this._Toaster.error(err.message);
        // }

        this.customSpinIsLoading = false;
      },
    });
  }
}
