import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-post-pay',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent, TranslateModule],
  templateUrl: './post-pay.component.html',
  styleUrls: ['./post-pay.component.css'],
})
export class PostPayComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner
  orderStatus: string = '';
  orderId: any;
  ngOnInit(): void {
    this.customSpinIsLoading = true;
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('orderId');
    });
    this.route.queryParams.subscribe(mobPayQuery => {
      this.orderStatus = mobPayQuery['success'];
      console.log(mobPayQuery, 'order status', this.orderStatus);
      this.customSpinIsLoading = false;
    });
  }
}
