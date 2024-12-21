import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { IRatingOptions, NgxStarsRatingModule } from 'ngx-stars-rating';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product';
import { CustomefillterPipe } from 'src/app/core/pipe/customefillter.pipe';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { Translate_Service } from 'src/app/core/services/translate.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-offers',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    RouterLink,
    NgxPaginationModule,
    NgxStarsRatingModule,
    TranslateModule,
    CustomefillterPipe,
    SpinnerComponent,
  ],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit,OnDestroy {
  constructor(
    private _HomeProductsService: HomeProductsService,
    private _WishListService: WishListService,
    private _Toaster: ToastrService,
    private _Router: Router,
    private _Renderer: Renderer2,
    public _Translate: TranslateService,
    private _RTLStatus: Translate_Service
  ) {}
  
  public rateNumber: number = 3;
  public ratingOptions: IRatingOptions = {
    starsCount: 5,
    hoverable: false,
    clickable: false,
  };

  customSpinIsLoading = false;
  products: Product[] = [];

  //Subscription ID
  getProductsId!:Subscription;
  
  ngOnInit(): void {
    this.customSpinIsLoading = true;

    this.getProductsId = this._HomeProductsService.getProducts().subscribe({
      next: response => {
        this.products = response.data.products;
        this.customSpinIsLoading = false;
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    if(this.getProductsId)this.getProductsId.unsubscribe();
  }

  addProductInWishList(id: any, element: HTMLElement): void {
    this.customSpinIsLoading = true;
    this._WishListService.postWishListItems(id).subscribe({
      next: () => {
        this._Renderer.setStyle(element, 'font-weight', 'bold');
        this._Toaster.success('Added in Your Favorite List');

        this.customSpinIsLoading = false;
      },
      error: err => {
        this.customSpinIsLoading = false;

        const errMsg = err?.error?.message || 'Something went wrong';
        this._Toaster.error(errMsg);
      },
    });
  }
}
