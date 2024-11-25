import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { IRatingOptions, NgxStarsRatingModule } from 'ngx-stars-rating';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgxPaginationModule,
    NgxStarsRatingModule,
    TranslateModule,
    SpinnerComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _Categories: CategoriesService,
    private _WishListService: WishListService,
    private _Toaster: ToastrService,
    private _Router: Router,
    private _Renderer: Renderer2,
    public _Translate: TranslateService
  ) {}

  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner

  allProductsCategory: any = [];
  titleCategory: string = '';
  arTitleCategory: string = '';
  categoryId!: any; // '!' to add initial value Undefined to this property

  //start Rating
  public rateNumber: number = 3;
  public ratingOptions: IRatingOptions = {
    starsCount: 5,
    hoverable: false,
    clickable: false,
  };

  //end Rating

  // pagination
  pageLimit: number = 0;
  currentPage: number = 1;
  totalItems: number = 0;

  ngOnInit(): void {
    this.customSpinIsLoading = true;

    this.route.paramMap.subscribe(params => (this.categoryId = params.get('category-id')));
    console.log('category id', this.categoryId);
    this.allCategoryProducts(this.categoryId);
  }

  allCategoryProducts(id: any): void {
    this._Categories.getCategoryProducts(id).subscribe({
      next: response => {
        this.allProductsCategory = response.data.products;
        this.titleCategory = response.data.products[0].category.enName;
        this.arTitleCategory = response.data.products[0].category.arName;
        console.log('title & categ id', this.titleCategory);
        console.log('category-products', this.allProductsCategory);
        this.pageLimit = response.data.pagination.limit;
        this.currentPage = response.data.pagination.page;
        this.totalItems = response.data.pagination.total;
        this.customSpinIsLoading = false;
      },
      error: err => {
        console.log(err);
        this.customSpinIsLoading = false;
      },
    });
  }

  //Add product in Wish list method
  addPoductInWishList(id: any, element: HTMLElement): void {
    this.customSpinIsLoading = true;
    this._WishListService.postWishListItems(id).subscribe({
      next: response => {
        this._Renderer.setStyle(element, 'font-weight', 'bold');
        this._Toaster.success('Added in Your Favorite List');
        console.log(response);
        this.customSpinIsLoading = false;
      },
      error: err => {
        if (err.statusText == 'Unauthorized') {
          this._Toaster.info('Should be Login !!');
          this._Router.navigate(['/login']);
        } else {
          this._Toaster.error(err.message);
        }
        this.customSpinIsLoading = false;
      },
    });
  }
  // pagination Method

  pageChanged(event: any) {
    //  products
    this.customSpinIsLoading = true;
    this._Categories.getCategoryProducts(this.categoryId, event).subscribe({
      next: response => {
        this.allProductsCategory = response.data.products;
        this.titleCategory = response.data.products[0].category.enName;
        console.log('title', this.titleCategory);
        console.log('category-products', this.allProductsCategory);
        this.pageLimit = response.data.pagination.limit;
        this.currentPage = response.data.pagination.page;
        this.totalItems = response.data.pagination.total;
        this.customSpinIsLoading = false;
      },
      error: err => {
        console.log(err);
        this.customSpinIsLoading = false;
      },
    });
  }
}
