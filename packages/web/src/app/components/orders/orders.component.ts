import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CuttdatePipe } from 'src/app/core/pipe/cuttdate.pipe';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TranslateModule, SpinnerComponent, CuttdatePipe],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private _UserDataService: UserService,
    private _AuthService: AuthService,
    public _Translate: TranslateService
  ) {}
  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner

  orders: any = [];
  activeClass = 'defaultcolor';
  ngOnInit(): void {
    this.customSpinIsLoading = true;
    this._AuthService.decodeUser();

    this._UserDataService.getUserOrders(this._AuthService.userInfo?.id).subscribe({
      next: response => {
        this.orders = response.data.orders;
        console.log('orders', response);
        this.customSpinIsLoading = false;
      },
      error: err => {
        console.log(err);
        this.customSpinIsLoading = false;
      },
    });
  }

  setActiveClass() {
    this.activeClass = 'thirdcolor';
  }
}
