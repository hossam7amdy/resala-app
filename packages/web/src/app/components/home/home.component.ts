import { CommonModule } from '@angular/common';
import { AfterViewInit, OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/core/interfaces/category';
import { Product } from 'src/app/core/interfaces/product';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterLink, NgxPaginationModule, SearchPipe ], //
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private _HomeProductsService: HomeProductsService,
    private _Categories: CategoriesService,
    private _WishListService: WishListService,
    private _Toaster: ToastrService,
    private _Router: Router,
    private _Renderer: Renderer2,
    private spinner:NgxSpinnerService
  ) {}

  // interfaces
  products: Product[] = [];
  category: Category[] = [];

  imgPlaceHolder: string = '';

  // overlay
  onClick: boolean = false;

    // pagination
    pageLimit:number =0;
    currentPage:number = 1;
    totalItems:number=0;
  //favourit icons
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentProduct: any;

  ngOnInit(): void {
    this.spinner.show();
    //  products
    this._HomeProductsService.getProducts().subscribe({
      next: response => {
        console.log(response.data);
        console.log('products', response.data.products);
        this.products = response.data.products;
        this.pageLimit = response.data.pagination.limit;
        this.currentPage = response.data.pagination.page;
        this.totalItems = response.data.pagination.total;
      },
    });

    // categories
    this._Categories.getCategories().subscribe({
      next: response => {
        console.log('categories', response.data);
      },
    });
    setTimeout(() => {
      this.spinner.hide();   
    }, 1000);
  }

  // overlay
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onClick = true;
    }, 20000);
  }
  closeOverlay() {
    this.onClick = false;
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

  // categories slider
  // categoryOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   autoWidth: true,
  //   margin: 10,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     400: {
  //       items: 2,
  //     },
  //     740: {
  //       items: 3,
  //     },
  //     940: {
  //       items: 4,
  //     },
  //   },
  //   nav: false,
  // };

  // main slider
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    items: 1.1,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 3000,

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
    navText: ['', ''],
    items: 1,
    nav: false,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplaySpeed: 10000,

    autoplayHoverPause: true,
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
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
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
    nav: true,
  };


  // pagination Method

  pageChanged(event:any){
     //  products
     this._HomeProductsService.getProducts(event).subscribe({
      next: response => {
        console.log(event);
        console.log('products', response.data.products);
        this.products = response.data.products;
        this.pageLimit = response.data.pagination.limit;
        this.currentPage = response.data.pagination.page;
        this.totalItems = response.data.pagination.total;
      },
    });
  }
}
