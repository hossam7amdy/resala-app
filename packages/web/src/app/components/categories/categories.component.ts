import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
constructor(
  // private route:ActivatedRoute,
  // private _Categories:CategoriesService
){}

  // allProductsCategory:any = [];
  // categoryId!:any;  // '!' to add initial value Undefined to this property

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params =>(this.categoryId = params.get('category-id')));
    // this.allCategoryProducts(this.categoryId);
  }

  // allCategoryProducts(id:any):void{
  //   this._Categories.getCategoryProducts(id).subscribe({
  //     next:(response)=>{
  //       this.allProductsCategory = response.data
  //       console.log(response)
  //     },error:(err)=>{
  //       console.log(err);
  //     }
  //   })
  // }

}
