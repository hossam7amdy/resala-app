import { CommonModule } from '@angular/common';
import { OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { IRatingOptions, NgxStarsRatingModule } from 'ngx-stars-rating';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CuttdatePipe } from 'src/app/core/pipe/cuttdate.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { ReviewsService } from 'src/app/core/services/reviews.service';
import { Translate_Service } from 'src/app/core/services/translate.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

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
    TranslateModule,
    BreadcrumbComponent,
    SpinnerComponent,
  ],

  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(
    // ActivatedRoute this class to access the param in URL & use paramMap property & use subscribe method
    private route: ActivatedRoute,
    private _HomeProductsService: HomeProductsService,
    private _CartService: CartService,
    private _toaster: ToastrService,
    private _Renderer2: Renderer2,
    private _Router: Router,
    private _Reviews: ReviewsService,
    private _ProductsCategory: CategoriesService,
    private _WishListService: WishListService,
    private _Toaster: ToastrService,
    private _RTLStatus: Translate_Service,
    public _Translate: TranslateService
  ) {}

  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner
  counterQuantity: number = 1;
  priceAfterSale: number = 0;

  productId!: any; // '!' to add initial value Undefined to this property 'productId'

  productDetails: any = null; // this property to take value of object 'respons.data'
  productImages: any = null;
  selectedIimage: string = '';
  productStock: any = [];
  productStockColor: any = [];
  productStockSize: any = [];
  reboColor: any = [];
  btnDisable: boolean = true;
  loadingBtn: boolean = false;

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
  quantity!: number;
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

  // static productId: any;
  isZoomed = false;
  zoomStyle = {};

  //imgURL
  imgUrlZoomin:string='';



  //Subscription ID
  getProductDetailsId!: Subscription;
  getProductReviewId!: Subscription;
  getCategoryProductsId!: Subscription;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => (this.productId = params.get('product-id')));
    this.getProductDetails(this.productId);
    this.getProductReviewId = this._Reviews.getProductReview(this.productId, '10').subscribe({
      next: res => {
        this.productReview = res.data.reviews;
      },
      error: () => {},
    });
  }
  ngOnDestroy(): void {
    if (this.getProductDetailsId) this.getProductDetailsId.unsubscribe();
    if (this.getCategoryProductsId) this.getCategoryProductsId.unsubscribe();
    if (this.getProductReviewId) this.getProductReviewId.unsubscribe();
  }

  getProductDetails(id: any) {
    this.customSpinIsLoading = true;
    this.getProductDetailsId = this._HomeProductsService.getProductDetails(id).subscribe({
      next: res => {
        this.productDetails = res?.data;
        this.productImages = res?.data?.imageUrl;
        this.categoryId = res?.data.category.id;
        this.productStock = res?.data.stocks;
        this.productStockColor = this.productStock;
        console.log(res);
        this.productStockColor = this.productStockColor.reduce((a: any[], b: { colorId: any }) => {
          if (!a.find(data => data.color.id == b.colorId)) {
            a.push(b);
          }
          return a;
        }, []);
      },

      error: () => {
        this._Toaster.error(
          this._Translate.currentLang == 'ar' ? 'خطأ فى تحميل بعض البيانات' : 'Some data went wrong'
        );
        this.customSpinIsLoading = false;
      },
      complete: () => {
        this.getProductsCategory(this.categoryId);
        this.customSpinIsLoading = false;
      },
    });
  }

  toggleZoom(state: boolean) {
    this.isZoomed = state;
    this.zoomStyle = state ? this.zoomStyle : {};
  }

  setZoomPosition(event: MouseEvent) {
    if (this.isZoomed) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const x = event.clientX - rect.left; // X position within the image
      const y = event.clientY - rect.top; // Y position within the image

      this.zoomStyle = {
        transformOrigin: `${x}px ${y}px`, // Set the origin for zoom
      };
    }
  }

  // Change page Direction as per Selected Lang
  changePageDirection(): boolean {
    this.customSpinIsLoading = true;
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
    this.customSpinIsLoading = false;
    return rtlStat;
  }

  goToReview(trarget: HTMLElement): void {
    trarget.scrollIntoView({ behavior: 'smooth' });
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
    rtl: this.changePageDirection(),
  };

  // carousel mini images
  miniImgCarousel: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    rtl: this.changePageDirection(),
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
    this.counterQuantity = 1;
    this.stockIdSize = '';
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
    this.counterQuantity = 1;
    this.btnDisable = false;
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

  addProduct(productId: string) {
    this.loadingBtn = true;
    this.btnDisable = true;

    if (this.isChooseColor && this.isChooseSize === true && this.stockIdSize != '') {
      // this._Renderer2.setAttribute(element, 'disabled', 'true');
      const requiredCount: string = this.counterQuantity.toString();
      this._CartService.addToCart(productId, requiredCount).subscribe({
        next: res => {
          this._CartService.cartNumber.next(res.data.totalQuantity);

          this._toaster.success(
            this._Translate.currentLang == 'ar'
              ? 'تمت الاضافة الى السلة بنجاح'
              : 'added one product successfuly'
          );
          this.loadingBtn = false;
        },
        error: () => {
          this._Toaster.error(
            this._Translate.currentLang == 'ar'
              ? 'خطأ فى تحميل بعض البيانات'
              : 'Some data went wrong'
          );
          this.loadingBtn = false;
        },
      });
    } else {
      this._toaster.info(
        this._Translate.currentLang == 'ar'
          ? 'برجاء اختيار اللون والمقاس'
          : 'should be choose color and size'
      );
      this.loadingBtn = false;
    }

    // this._Renderer2.removeAttribute(element, 'disabled');
  }

  // similar products
  getProductsCategory(id: any): void {
    this.getCategoryProductsId = this._ProductsCategory.getCategoryProducts(id).subscribe({
      next: res => {
        this.productsCategory = res.data.products;
      },
      error: () => {},
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
    rtl: this.changePageDirection(),
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
    this.customSpinIsLoading = true;
    this._WishListService.postWishListItems(id).subscribe({
      next: () => {
        this._Renderer2.setStyle(element, 'font-weight', 'bold');
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

  reloadPage(id: any): void {
    this.customSpinIsLoading = true;
    window.location.replace(`/product-details/${id}`);
    this.customSpinIsLoading = false;
  }

  // zoomStyles = {};
  // isZoomActive = false;
  // isCursorVisible = false;
  // cursorStyles = {};
  // overlayStyles = {}; // Style object for overlay position
  // isMouseMoving = false; // Track if the mouse is moving
  // private mouseMoveTimeout: any;

  // onMouseMove(event: MouseEvent): void {
  //   const { offsetX, offsetY, target } = event;
  //   const { offsetWidth, offsetHeight } = target as HTMLElement;

  //   // Activate zoom display
  //   this.isZoomActive = true;

  //   // Calculate position of zoomed image based on mouse position
  //   const xPercent = (offsetX / offsetWidth) * 100;
  //   const yPercent = (offsetY / offsetHeight) * 100;

  //   this.zoomStyles = {
  //     transformOrigin: `${xPercent}% ${yPercent}%`,
  //     transform: 'scale(5)', // Adjust zoom scale here
  //   };

  //   // Update custom cursor position
  //   this.cursorStyles = {
  //     top: `${event.offsetY}px`,
  //     left: `${event.offsetX}px`,
  //   };

  //   // Show overlay only if the mouse is still
  //   this.isMouseMoving = true;
  //   clearTimeout(this.mouseMoveTimeout);
  //   this.mouseMoveTimeout = setTimeout(() => {
  //     this.isMouseMoving = false; // Mouse is considered still after 200ms
  //   }, 200);
  // }

  // showCustomCursor(): void {
  //   this.isCursorVisible = true;
  // }

  // hideCustomCursor(): void {
  //   this.isCursorVisible = false;
  //   this.isZoomActive = false;
  //   this.zoomStyles = {};
  //   this.isMouseMoving = false;
  //   this.overlayStyles = {};
  // }

  openImage(imageUrl: string) {
    // window.open(imageUrl, '_blank');
    this.imgUrlZoomin = imageUrl;
  }
 
}
