import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { Product} from 'src/app/core/interfaces/product';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/core/interfaces/category';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _HomeProductsService:HomeProductsService, private _Categories:CategoriesService){}

  // interfaces 
  products:Product[] =[]
  category:Category[] =[]
  

  imgPlaceHolder:string='' ;

  ngOnInit():void{

    //  products
    this._HomeProductsService.getProducts().subscribe({
      next:(response)=> {
        console.log(response.data.products);
        this.products = response.data.products
      },
    });


    // categories
    this._Categories.getCategories().subscribe({
      next:(response)=>{
        console.log('categories', response.data);
      }
    })

  }

  // categories slider
  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
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
    nav: false
  }

  // main slider
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false,
    autoplay:true,
    autoplayTimeout:5000,
    autoplaySpeed:3000,

    autoplayHoverPause:true
  }
}
