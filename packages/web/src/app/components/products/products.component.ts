import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { WishListService } from 'src/app/core/services/wish-list.service';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements  OnInit {
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

    // pagination
    pageLimit:number =0;
    currentPage:number = 1;
    totalItems:number=0;

  ngOnInit(): void {
    this.spinner.show()
    this.route.paramMap.subscribe(params =>(this.categoryId = params.get('category-id')));
    this.allCategoryProducts(this.categoryId);
    this.spinner.hide()
  }



 
  allCategoryProducts(id:any):void{

    this._Categories.getCategoryProducts(id).subscribe({
      next:(response)=>{
        this.allProductsCategory = response.data.products
        this.titleCategory = response.data.products[0].category.enName;
        console.log('title',this.titleCategory);
        console.log('category-products',this.allProductsCategory);
        this.pageLimit = response.data.pagination.limit;
        this.currentPage = response.data.pagination.page;
        this.totalItems = response.data.pagination.total;
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
        if (err.statusText == 'Unauthorized') {
          this._Toaster.info('Should be Login !!');
          this._Router.navigate(['/login']);
        } else {
          this._Toaster.error(err.message);
        }
        console.log(err);
      },
    });
  }
// pagination Method

pageChanged(event:any){
  //  products
  this._Categories.getCategoryProducts(this.categoryId, event).subscribe({
    next:(response)=>{
      this.allProductsCategory = response.data.products
      this.titleCategory = response.data.products[0].category.enName;
      console.log('title',this.titleCategory);
      console.log('category-products',this.allProductsCategory);
      this.pageLimit = response.data.pagination.limit;
      this.currentPage = response.data.pagination.page;
      this.totalItems = response.data.pagination.total;
    },error:(err)=>{
      console.log(err);
    }
  })
}

}
