import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-post-pay',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent, TranslateModule],
  templateUrl: './post-pay.component.html',
  styleUrls: ['./post-pay.component.css'],
})
export class PostPayComponent implements OnInit,OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private _CartService: CartService
  ) {}
  
  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner
  orderStatus: string = '';
  orderId: any;
  cartDetails: any = {};
  // Subscription ID
  clearCartId!:Subscription;
  queryParamsId!:Subscription;
  ngOnInit(): void {
    this.customSpinIsLoading = true;
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('orderId');
    });
    this.queryParamsId = this.route.queryParams.subscribe(mobPayQuery => {
      this.orderStatus = mobPayQuery['success'];
      // this._CartService.cartNumber.next(0);

      this.customSpinIsLoading = false;
    });

    if (this.orderStatus == 'true') {
      this.clearCartId = this._CartService.clearCart().subscribe({
        next: response => {
          this.cartDetails = response.data;
          this._CartService.cartNumber.next(response.data.totalQuantity);
          this.customSpinIsLoading = false;
        },
        error: () => {
          this.customSpinIsLoading = false;
        },
      });
    }
  }
  ngOnDestroy(): void {
    if(this.queryParamsId)this.queryParamsId.unsubscribe();
    if(this.clearCartId)this.clearCartId.unsubscribe();
  }
}
