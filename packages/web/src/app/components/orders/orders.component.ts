import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
// import { ListOrdersResponse } from '@resala/shared';
import { CuttdatePipe } from 'src/app/core/pipe/cuttdate.pipe';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TranslateModule, SpinnerComponent, CuttdatePipe],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit,OnDestroy {
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    public _translate: TranslateService,
    private _Router: Router
  ) {}
  
  
  // FIXME: User order response type as `ListOrdersResponse['data']['orders']` instead of any
  orders: any=[];
  customSpinIsLoading = false;
  activeClass = 'defaultcolor';
  //Suscription ID
  getUserOrdersId!:Subscription;

  ngOnInit(): void {
    this.customSpinIsLoading = true;
    this._authService.userInfo$.subscribe(user => {
      if (user) {
        this.getUserOrdersId = this._userService.getUserOrders(user.id.toString()).subscribe({
          next: ({ data }) => {
            this.orders = data.orders;
            this.customSpinIsLoading = false;
          },
          error: () => {
            this.customSpinIsLoading = false;
          },
        });
      }
    });
  }
  // Destroy
  ngOnDestroy(): void {
    if(this.getUserOrdersId)this.getUserOrdersId.unsubscribe();
  }

  reDirectFun() {
    this._Router.navigate(['/home']);
  }

  setActiveClass() {
    this.activeClass = 'thirdcolor';
  }
}
