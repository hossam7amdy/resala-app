import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from 'src/app/core/services/cart.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-post-pay',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent, TranslateModule],
  templateUrl: './post-pay.component.html',
  styleUrls: ['./post-pay.component.css'],
})
export class PostPayComponent implements OnInit {
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
  ngOnInit(): void {
    this.customSpinIsLoading = true;
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('orderId');
    });
    this.route.queryParams.subscribe(mobPayQuery => {
      this.orderStatus = mobPayQuery['success'];
      // this._CartService.cartNumber.next(0);
      console.log(mobPayQuery, 'order status', this.orderStatus);
      this.customSpinIsLoading = false;
    });

    if (this.orderStatus == 'true') {
      this._CartService.clearCart().subscribe({
        next: response => {
          this.cartDetails = response.data;
          this._CartService.cartNumber.next(response.data.totalQuantity);
        },
        error: () => {
          this.customSpinIsLoading = false;
        },
      });
    }
  }
}
