import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { WishListService } from 'src/app/core/services/wish-list.service';


@Component({
  selector: 'app-products-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.css']
})
export class ProductsCategoryComponent implements OnInit {
  constructor(
    private route:ActivatedRoute,
    private _Categories:CategoriesService,
    private _WishListService: WishListService,
    private _Toaster: ToastrService,
    private _Router: Router,
    private _Renderer: Renderer2,
    private spinner:NgxSpinnerService

    

  ){}
  

  allProductsCategory:any = [];
  titleCategory:string = '';
  categoryId!:any;  // '!' to add initial value Undefined to this property

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params =>(this.categoryId = params.get('category-id')));
    
    this.allCategoryProducts(this.categoryId);
   
  }



  
 
  allCategoryProducts(id:any):void{
   
    this._Categories.getCategoryProducts(id).subscribe({

      next:(response)=>{
        this.allProductsCategory = response.data
        this.titleCategory = response.data[0].category.enName;
        console.log(response)
      },error:(err)=>{
        console.log(err);
      }
    })
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
        if (err.error.message == 'Token expired') {
          this._Toaster.error('Should be Login !!');
          this._Router.navigate(['/login']);
        } else {
          this._Toaster.error(err.message);
        }
        console.log(err);
      },
    });
  }

}
