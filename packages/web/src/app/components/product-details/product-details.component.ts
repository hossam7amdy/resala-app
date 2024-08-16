/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { HomeProductsService } from 'src/app/core/services/home-products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CarouselModule, FormsModule, RouterOutlet],

  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  static productId: any;

  constructor(
    private route: ActivatedRoute,
    private _HomeProductsService: HomeProductsService,
    private spinner: NgxSpinnerService,
    private _CartService: CartService,
    private _toaster: ToastrService,
    private _Renderer2: Renderer2,
    private _Router: Router
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
  }

  getProductDetails(id: any) {
    this._HomeProductsService.getProductDetails(id).subscribe({
      next: res => {
        this.productDetails = res?.data;
        this.productImages = res?.data?.images;
        console.log('productdetails', res.data);
      },
      error: err => console.log(err),
      complete: () => this.getProductStock(id),
    });
  }

  getProductStock(id: any) {
    this._HomeProductsService.getProductStock(id).subscribe({
      next: res => {
        this.productStock = res?.data;

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
    });
  }
  // removeDuplicat() {
  //   this.productStockColor = this.productStock;
  //   this.productStockColor = this.productStockColor.reduce((a: any[], b: { colorId: any; }) => {
  //     if (!a.find(data => data.colorId == b.colorId)) {
  //       a.push(b)
  //     }
  //     return a
  //   }, []);
  //   console.log('after filter', this.productStockColor);
  // }

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
        },
        error: err => {
          localStorage.setItem('productId', this.productId);
          this._toaster.error(err.error.message); //'Should be Login'
          this._Router.navigate(['/login']);
          console.log('response', productId, quantity, err);
        },
      });
    } else {
      this._toaster.info('should be choose color and size');
    }

    this._Renderer2.removeAttribute(element, 'disabled');
  }
}
