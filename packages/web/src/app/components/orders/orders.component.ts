import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private _UserDataService: UserService,
    private _AuthService: AuthService,
    private spinner: NgxSpinnerService,
    public _Translate: TranslateService
  ) {}
  orders: any = [];
  activeClass = 'defaultcolor';
  ngOnInit(): void {
    this.spinner.show();
    this._AuthService.decodeUser();

    this._UserDataService.getUserOrders(this._AuthService.userInfo.id).subscribe({
      next: response => {
        this.orders = response.data.orders;
        console.log('orders', response);
      },
      error: err => {
        console.log(err);
      },
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  setActiveClass() {
    this.activeClass = 'thirdcolor';
  }
}
