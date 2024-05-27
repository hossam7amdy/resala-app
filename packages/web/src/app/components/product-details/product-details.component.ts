import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductDetails } from 'src/app/core/interfaces/product-details';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/core/services/cart.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CarouselModule, FormsModule, RouterOutlet],

  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _HomeProductsService: HomeProductsService,
    private spinner: NgxSpinnerService,
    private _CartService: CartService,

  ) { } // ActivatedRoute this class to access the param in URL & use paramMap property & use subscribe method


  counterQuantity: number = 1;

  productId!: string | null; // '!' to add initial value Undefined to this property 'productId'

  productDetails: any = null; // this property to take value of object 'respons.data'
  productImages: any = null;
  productStock: any = [];
  productStockColor: any = [];
  productStockSize: any = [];
  reboColor: any = [];

  //color option variable
  selectedColor: string = '';
  currentColor: string = '';

  //size Btn variable
  statusClassSizeBtn = 'btn-not-active';
  selectedSize: string = '';
  currentSize: string = '';


  ngOnInit(): void {
    // start code test



    //end code test
    this.spinner.show();
    this.route.paramMap.subscribe((params) => this.productId = params.get('product-id'));
    this.getProductDetails(this.productId);


  }

  getProductDetails(id: any) {
    this._HomeProductsService.getProductDetails(id).subscribe({
      next: (res) => {
        this.productDetails = res?.data;
        this.productImages = res?.data?.images;
        console.log('productdetails', res.data);
      },
      error: (err) => console.log(err),
      complete: () => this.getProductStock(id),
    });
  }

  getProductStock(id: any) {
    this._HomeProductsService.getProductStock(id).subscribe({
      next: (res) => {
        this.productStock = res?.data;

        console.log("stock", this.productStock);

        this.productStockColor = this.productStock;
        this.productStockColor = this.productStockColor.reduce((a: any[], b: { colorId: any; }) => {
          if (!a.find(data => data.colorId == b.colorId)) {
            a.push(b)
          }
          return a
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





  productDetailsOption: OwlOptions = {
    loop: true,
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
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 8
      }
    },
    nav: true
  }
  // show products after delete repeated products method




  onColorChange(event: any) {
    this.selectedColor = event?.color?.enName;
    this.currentColor = event?.color?.id
    console.log(this.selectedColor);
  }

  onSizeChange(event: any) {
    this.selectedSize = event?.size?.name;
    this.currentSize = event?.size?.id
    console.log(this.selectedSize);
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

  addProduct(productId: string, quantity: string) {
    this._CartService.addToCart(productId, quantity).subscribe({
      next: (res) => {
        console.log(res);
      },

    });
  }
}
