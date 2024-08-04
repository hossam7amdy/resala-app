import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Injectable, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/core/interfaces/category';
import { Product } from 'src/app/core/interfaces/product';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { WishListService } from 'src/app/core/services/wish-list.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterLink],
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
    private _Renderer: Renderer2
  ) { }

  // interfaces
  products: Product[] = [];
  category: Category[] = [];

  imgPlaceHolder: string = '';

  // overlay
  onClick: boolean = false;

  //favourit icons
  currentProduct: any;

  ngOnInit(): void {
    //  products
    this._HomeProductsService.getProducts().subscribe({
      next: response => {
        console.log(response.data);
        console.log('products', response.data.products);
        this.products = response.data.products;
      },
    });

    // categories
    this._Categories.getCategories().subscribe({
      next: response => {
        console.log('categories', response.data);
      },
    });
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
    this._Renderer.setStyle(element, 'font-weight', 'bold');
    this._WishListService.postWishListItems(id).subscribe({
      next: (response) => {

        this._Toaster.success('Added in Your Favorite List');
        console.log(response);

      }, error: (err) => {
        if (err.error.message == 'Token expired') {
          this._Toaster.error('Should be Login !!')
          this._Router.navigate(['/login'])
        } else {
          this._Toaster.error(err.message);
        }
        console.log(err);
      }
    })
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
    navText: ['', ''],
    items: 1,
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
}
