import { CommonModule } from '@angular/common';
import { OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRatingOptions, NgxStarsRatingModule } from 'ngx-stars-rating';
import { ToastrService } from 'ngx-toastr';
import { CuttdatePipe } from 'src/app/core/pipe/cuttdate.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { ReviewsService } from 'src/app/core/services/reviews.service';
import { WishListService } from 'src/app/core/services/wish-list.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    FormsModule,
    RouterOutlet,
    NgxStarsRatingModule,
    CuttdatePipe,
    RouterLink,
  ],

  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  // static productId: any;

  constructor(
    private route: ActivatedRoute,
    private _HomeProductsService: HomeProductsService,
    private spinner: NgxSpinnerService,
    private _CartService: CartService,
    private _toaster: ToastrService,
    private _Renderer2: Renderer2,
    private _Router: Router,
    private _Reviews: ReviewsService,
    private _ProductsCategory: CategoriesService,
    private _WishListService: WishListService,
    private _Renderer: Renderer2,
    private _Toaster: ToastrService
  ) {} // ActivatedRoute this class to access the param in URL & use paramMap property & use subscribe method

  counterQuantity: number = 1;

  productId!: any; // '!' to add initial value Undefined to this property 'productId'

  productDetails: any = null; // this property to take value of object 'respons.data'
  productImages: any = null;
  selectedIimage: string = '';
  productStock: any = [];
  productStockColor: any = [];
  productStockSize: any = [];
  reboColor: any = [];

  cartDetails: any = {};
  //property navigate from login to product details id
  endPointProductId: string = '';

  //color option property
  selectedColor: string = '';
  currentColor: string = '';
  isChooseColor: boolean = false;
  stockIndex: any;

  //size Btn property
  statusClassSizeBtn = 'btn-not-active';
  selectedSize: string = '';
  currentSize: string = '';
  stockIdColor: string = '';
  stockIdSize: string = '';
  quantity: string = '';
  isChooseSize: boolean = false;

  // Reviews
  productReview: any = [];
  averageRate: number = 0;
  ratingTotal: number = 0;
  //start Rating
  public rateNumber: number = 2;
  public ratingOptions: IRatingOptions = {
    starsCount: 5,
    hoverable: false,
    clickable: false,
  };

  //end Rating

  //  Similar products
  productsCategory: any = [];
  categoryId: any;

  ngOnInit(): void {
    // start code test

    //end code test
    this.spinner.show();
    this.route.paramMap.subscribe(params => (this.productId = params.get('product-id')));
    this.getProductDetails(this.productId);

    this._CartService.getCartUser().subscribe({
      next: response => {
        console.log(response);
        this.cartDetails = response.data;
      },
      error: err => {
        console.log(err);
      },
    });

    this._Reviews.getProductReview(this.productId, '10').subscribe({
      next: res => {
        console.log('test');
        console.log('review', res);
        this.productReview = res.data.reviews;
      },
    });
  }

  getProductDetails(id: any) {
    this._HomeProductsService.getProductDetails(id).subscribe({
      next: res => {
        this.productDetails = res?.data;
        this.productImages = res?.data?.images;
        this.categoryId = res?.data.categoryId;
        console.log('productdetails', res.data, 'cat id' + this.categoryId);
      },
      error: err => console.log(err),
      complete: () => this.getProductStock(id),
    });
  }

  getProductStock(id: any) {
    this._HomeProductsService.getProductStock(id).subscribe({
      next: res => {
        this.productStock = res?.data.stocks;

        console.log('stock', this.productStock);

        this.productStockColor = this.productStock;
        this.productStockColor = this.productStockColor.reduce((a: any[], b: { colorId: any }) => {
          if (!a.find(data => data.color.id == b.colorId)) {
            a.push(b);
          }
          return a;
        }, []);

        this.spinner.hide();
        console.log('after filter', this.productStockColor);
      },
      complete: () => this.getProductsCategory(this.categoryId),
    });
  }

  public onClickRate(rate: number): void {
    // Logs the clicked star number
    console.log('rate', rate);
  }
  goToReview(trarget: HTMLElement): void {
    trarget.scrollIntoView({ behavior: 'smooth' });
    // trarget.scrollTo({behavior:'smooth'})
  }
  mainImage: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    items: 1,
    nav: false,
  };

  // carousel mini images
  miniImgCarousel: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 2,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  // show products after delete repeated products method

  changeimage(image: string) {
    this.selectedIimage = image;
  }

  onColorChange(event: any, index: number) {
    this.selectedColor = event?.color?.enName;
    this.currentColor = event?.color?.id;
    this.stockIdColor = event?.id;
    this.stockIndex = index;
    console.log(this.selectedColor, this.stockIndex);
  }
  isChooseColorFun() {
    this.isChooseColor = true;
  }

  isChooseSizeFun() {
    this.isChooseSize = true;
  }
  onSizeChange(event: any) {
    this.selectedSize = event?.size;
    this.currentSize = event?.sizeId;
    this.stockIdSize = event?.stockId;
    this.quantity = event?.quantity;
    console.log(this.selectedSize, this.stockIdSize);
  }

  setActiveClass() {
    this.statusClassSizeBtn = 'active';
  }

  plusCounterQuantity() {
    this.counterQuantity++;
  }

  minCounterQuantity() {
    if (this.counterQuantity > 1) {
      this.counterQuantity--;
    } else {
      this.counterQuantity = 1;
    }
  }

  addProduct(productId: string, quantity: any, element: HTMLButtonElement) {
    if (this.isChooseColor && this.isChooseSize === true) {
      this._Renderer2.setAttribute(element, 'disabled', 'true');

      this._CartService.addToCart(productId, quantity).subscribe({
        next: res => {
          console.log(res);
          this._CartService.cartNumber.next(res.data.totalQuantity);
          console.log('cart number :' + this._CartService.cartNumber);
          this._toaster.success('added one product successfuly');
          this._Router.navigate(['/cart']);
        },
        error: err => {
          localStorage.setItem('productId', this.productId);
          this._toaster.error('please login !!'); //'Should be Login'
          this._Router.navigate(['/login']);
          console.log('response', productId, quantity, err);
        },
      });
    } else {
      this._toaster.info('should be choose color and size');
    }

    this._Renderer2.removeAttribute(element, 'disabled');
  }

  // similar products
  getProductsCategory(id: any): void {
    this._ProductsCategory.getCategoryProducts(id).subscribe({
      next: res => {
        console.log('similar pro', res);
        this.productsCategory = res.data.products;
      },
      error: err => {
        console.log(err);
      },
    });
  }

  similarProducts: OwlOptions = {
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

  //Add product in Wish list method
  addPoductInWishList(id: any, element: HTMLElement): void {
    this._WishListService.postWishListItems(id).subscribe({
      next: (response: any) => {
        this._Renderer.setStyle(element, 'font-weight', 'bold');
        this._Toaster.success('Added in Your Favorite List');
        console.log(response);
      },
      error: (err: any) => {
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

  reloadPage(id: any): void {
    this.spinner.show();
    window.location.replace(`/product-details/${id}`);
    this.spinner.hide();
  }
}
