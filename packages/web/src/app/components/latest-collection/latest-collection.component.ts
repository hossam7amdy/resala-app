import { CommonModule } from '@angular/common';
import {  OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/core/interfaces/product';

import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { WishListService } from 'src/app/core/services/wish-list.service';

import { NgxSpinnerService } from 'ngx-spinner';

import { ReviewsService } from 'src/app/core/services/reviews.service';
import { NgxStarsRatingModule } from 'ngx-stars-rating';
import { IRatingOptions } from 'ngx-stars-rating';

@Component({
  selector: 'app-latest-collection',
  standalone: true,
  imports: [CommonModule, RouterLink,NgxStarsRatingModule],
  templateUrl: './latest-collection.component.html',
  styleUrls: ['./latest-collection.component.css']
})
export class LatestCollectionComponent implements OnInit{
  constructor(
    private _HomeProductsService: HomeProductsService,
    private _WishListService: WishListService,
    private _Toaster: ToastrService,
    private _Router: Router,
    private _Renderer: Renderer2,
    private spinner:NgxSpinnerService,
    private _Reviews:ReviewsService
 
  ) {}
  UserProfile: any;
 
  userNameLogged: any;
  productId:string='';


   //start Rating
   public rateNumber: number = 2;
    public ratingOptions: IRatingOptions = {
        starsCount: 5,
        hoverable: false,
        clickable: false
    };

   

  
   //end Rating

  // interfaces
  products: Product[] = [];
  

  imgPlaceHolder: string = '';

  

   
  //favourit icons
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentProduct: any;

  ngOnInit(): void {
    this.spinner.show();
    //  products
    this._HomeProductsService.getProducts('1','20').subscribe({
      next: response => {
        console.log(response.data);
        console.log('products', response.data);
        this.products = response.data.products;
        
       
      },
    });

//Reviews
    this._Reviews.getProductReview('1', '100').subscribe({
      next:(res)=>{
        console.log('Reviews',res)
        this.rateNumber = res.data.reviews.rating;
      },error:(err)=>{
        console.log(err)
      }
    })

    setTimeout(() => {
      this.spinner.hide();   
    }, 1000);
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

 
  public onClickRate(rate: number): void {
      console.log(rate, 'rate'); // Logs the clicked star number
  }



  


}
