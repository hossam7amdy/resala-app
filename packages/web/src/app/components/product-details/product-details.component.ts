import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductDetails } from 'src/app/core/interfaces/product-details';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private _ActivatedRoute: ActivatedRoute,
    private _HomeProductsService: HomeProductsService,
    private spinner: NgxSpinnerService
  ) { } // ActivatedRoute this class to access the param in URL & use paramMap property & use subscribe method

  counterQuantity: number = 1;

  productId!: string | null; // '!' to add initial value Undefined to this property 'productId'

  productDetails: any = []; // this property to take value of object 'respons.data'
  productImages: any = [];
  productStock: any = [];

  //color option variable
  selectedColor: string = '';
  selectedSize: string = '';

  //size Btn variable
  statusClassSizeBtn = 'btn-not-active';

  ngOnInit(): void {
    this.spinner.show();
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('product-id');
        console.log('product id', this.productId);
      },
    });

    this._HomeProductsService.getProductDetails(this.productId).subscribe({
      next: (respons) => {
        //we can using destructing for data ({data}) insteade of (respons)
        console.log('productdetails', respons.data);
        this.productDetails = respons.data;
      },
    });

    this._HomeProductsService.getProductDetails(this.productId).subscribe({
      next: (respons) => {
        //we can using destructing for data ({data}) insteade of (respons)
        console.log('productdetails', respons.data.images);
        this.productImages = respons.data.images;

      },
    });

    this._HomeProductsService.getProductStock(this.productId).subscribe({
      complete: () => {
        this._HomeProductsService.getProductStock(this.productId).subscribe({
          next: (response) => {
            this.productStock = response.data;
            console.log(this.productStock);
            this.spinner.hide();
          },
        });
      },
    });


  }

  // owl carusal  navText: ['<<', '>>'],
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
        items: 4
      }
    },
    nav: true
  }

  onColorChange(event: string) {
    this.selectedColor = event;
    console.log(this.selectedColor);
  }
  onSizeChange(event: string) {
    this.selectedSize = event;
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
}
