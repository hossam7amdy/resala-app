import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { Translate_Service } from 'src/app/core/services/translate.service';
import { WishListService } from 'src/app/core/services/wish-list.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    SearchPipe,
    NgxPaginationModule,
    RouterLink,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(
    private _HomeProducts: HomeProductsService,
    private _WishListService: WishListService,
    private _Renderer: Renderer2,
    private _Toaster: ToastrService,
    private _Router: Router,
    public _Translate: TranslateService,
    private _RTLStatus: Translate_Service
  ) {}

  isClickedSearch: boolean = false;
  products: Product[] = [];
  searchText: string = '';

  scrollTop(): void {
    window.scrollTo(0, 0);
  }
  toggleSearch(): void {
    this.isClickedSearch = true;
  }

  closeSearch(): void {
    this.isClickedSearch = false;
  }

  //Add product in Wish list method
  addPoductInWishList(id: any, element: HTMLElement): void {
    this._WishListService.postWishListItems(id).subscribe({
      next: () => {
        this._Renderer.setStyle(element, 'font-weight', 'bold');
        this._Toaster.success('Added in Your Favorite List');
      },
      error: () => {
        this._Toaster.error('Should be Login !!');
        this._Router.navigate(['/login']);
        // if (err.statusText == 'Unauthorized'|| err.error.message == 'JWT token is missing or invalid' || err.error.message == 'jwt expired') {

        // } else {
        //   this._Toaster.error(err.message);
        // }
      },
    });
  }

  searchProducts(): void {
    if (this.searchText !== '') {
      this._HomeProducts.getProductsSearch(this.searchText).subscribe({
        next: response => {
          this.products = response.data.products;
        },
        error: () => {},
      });
    }
  }
}
