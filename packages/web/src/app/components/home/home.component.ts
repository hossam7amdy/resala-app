import { CommonModule } from '@angular/common';
import { AfterViewInit, OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxStarsRatingModule } from 'ngx-stars-rating';
import { IRatingOptions } from 'ngx-stars-rating';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { Translate_Service } from 'src/app/core/services/translate.service';
import { TrendsService } from 'src/app/core/services/trends.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    RouterLink,
    NgxPaginationModule,
    SearchPipe,
    NgxStarsRatingModule,
    TranslateModule,
    SpinnerComponent,
  ], //
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  // UserProfile: any;
  // _AuthService: any;
  userNameLogged: any;
  productId: string = '';

  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner

  constructor(
    private _HomeProductsService: HomeProductsService,
    private _Categories: CategoriesService,
    private _WishListService: WishListService,
    private _Toaster: ToastrService,
    private _Router: Router,
    private _Renderer: Renderer2,
    private _Trend: TrendsService,
    public _Translate: TranslateService,
    private _RTLStatus: Translate_Service
  ) {}
  langStorage: any = localStorage.getItem('language');
  // Change page Direction as per Selected Lang
  changePageDirection(): boolean {
    const html = document.getElementsByTagName('html')[0];
    let rtlStat: boolean;
    if (this._RTLStatus.rTLStatus.value === 'ar') {
      html.dir = 'rtl';
      html.lang = 'ar';
      rtlStat = true;
    } else {
      html.dir = 'ltr';
      html.lang = 'en';
      rtlStat = false;
    }
    console.log('topbar rtlFun', rtlStat);
    return rtlStat;
  }

  // Trends
  trendProducts: any = [];

  //start Rating
  public rateNumber: number = 3;
  public ratingOptions: IRatingOptions = {
    starsCount: 5,
    hoverable: false,
    clickable: false,
  };

  //end Rating

  // interfaces
  products: Product[] = [];
  categories: Product[] = [];

  imgPlaceHolder: string = '';

  // overlay
  onClick: boolean = false;

  // pagination
  pageLimit: number = 2;
  currentPage: number = 1;
  totalItems: number = 0;
  //favourit icons
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentProduct: any;

  ngOnInit(): void {
    this.customSpinIsLoading = true;

    //trend products
    this._Trend.getTrendProducts().subscribe({
      next: res => {
        this.trendProducts = res.data;
        console.log('trends', res);
      },
    });

    //  products
    this._HomeProductsService.getProducts().subscribe({
      next: response => {
        console.log(response.data);
        console.log('products', response.data);
        this.products = response.data.products;
        this.categories = response.data.products;
        this.pageLimit = response.data.pagination.limit;
        this.currentPage = response.data.pagination.page;
        this.totalItems = response.data.pagination.total;

        this.customSpinIsLoading = false;
      },
    });
  }

  // overlay
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onClick = true;
    }, 10000);
  }
  closeOverlay() {
    this.onClick = false;
  }

  //Add product in Wish list method
  addPoductInWishList(id: any, element: HTMLElement): void {
    this.customSpinIsLoading = false;
    this._WishListService.postWishListItems(id).subscribe({
      next: response => {
        this._Renderer.setStyle(element, 'font-weight', 'bold');
        this._Toaster.success('Added in Your Favorite List');
        console.log(response);
        this.customSpinIsLoading = false;
      },
      error: err => {
        this._Toaster.error('Should be Login !!');
        this._Router.navigate(['/login']);
        this.customSpinIsLoading = false;
        // if (err.statusText == 'Unauthorized'|| err.error.message == 'JWT token is missing or invalid' || err.error.message == 'jwt expired') {

        // } else {
        //   this._Toaster.error(err.message);
        // }
        console.log(err);
      },
    });
  }

  public onClickRate(rate: number): void {
    console.log(rate, 'rate'); // Logs the clicked star number
  }

  // main slider
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    items: 1,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 3000,
    rtl: this.changePageDirection(),
    autoplayHoverPause: true,
  };

  //Trends

  trendsSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    items: 2,
    autoWidth: false,
    nav: true,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplaySpeed: 10000,
    margin: 6,
    autoplayHoverPause: true,
    rtl: this.changePageDirection(),
  };
  //navText: ['', '>>'],

  pobularProducts: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    center: true,

    margin: 5,
    autoWidth: true,
    nav: true,
    navSpeed: 700,

    responsive: {
      0: {
        items: 1,
      },

      300: {
        items: 1,
      },

      400: {
        items: 2,
      },

      600: {
        items: 3,
      },
      800: {
        items: 4,
      },
      940: {
        items: 4,
      },
      1150: {
        items: 5,
      },
    },
    rtl: this.changePageDirection(),
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
  };

  // pagination Method

  pageChanged(event: any) {
    //  products
    this.customSpinIsLoading = true;
    this._HomeProductsService.getProducts(event).subscribe({
      next: response => {
        console.log(event);
        console.log('products', response.data.products);
        this.products = response.data.products;
        this.pageLimit = response.data.pagination.limit;
        this.currentPage = response.data.pagination.page;
        this.totalItems = response.data.pagination.total;
        this.customSpinIsLoading = false;
      },
    });
  }
}
