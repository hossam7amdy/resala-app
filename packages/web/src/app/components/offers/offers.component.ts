import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRatingOptions, NgxStarsRatingModule } from 'ngx-stars-rating';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';
import { CustomefillterPipe } from 'src/app/core/pipe/customefillter.pipe';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { Translate_Service } from 'src/app/core/services/translate.service';
import { WishListService } from 'src/app/core/services/wish-list.service';

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
    private spinner: NgxSpinnerService,
    public _Translate: TranslateService,
    private _RTLStatus: Translate_Service
  ) {}

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
    this.spinner.show();

    //  products
    this._HomeProductsService.getProducts().subscribe({
      next: response => {
        console.log(response.data);
        console.log('products', response.data);
        this.products = response.data.products;

        // this.rateNumber = response.data.products.avgRating;
      },
    });

    this.spinner.hide();
  }

  //Add product in Wish list method
  addPoductInWishList(id: any, element: HTMLElement): void {
    this._WishListService.postWishListItems(id).subscribe({
      next: response => {
        this._Renderer.setStyle(element, 'font-weight', 'bold');
        this._Toaster.success('Added in Your Favorite List');
        console.log(response);
      },
      error: err => {
        this._Toaster.error('Should be Login !!');
        this._Router.navigate(['/login']);
        // if (err.statusText == 'Unauthorized'|| err.error.message == 'JWT token is missing or invalid' || err.error.message == 'jwt expired') {

        // } else {
        //   this._Toaster.error(err.message);
        // }
        console.log(err);
      },
    });
  }
}
