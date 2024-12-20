import { CommonModule } from '@angular/common';
import {OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, FormsModule, SpinnerComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // custome spinner
  customSpinIsLoading = false;
  //end custome spinner

  cartDetails: any = {};
  cartDetailsItems: any;
  checkedDeleteAll: boolean = false;
  confirmDeleteAll: boolean = false;
  totalCount: number = 0;

  // Edit Form
  isFormVisible = false;
  // update color and size
  productStock: any = [];
  productStockColor: any = [];
  productStockSize: any = [];
  currentColor: string = '';
  selectedColor: string = '';
  stockIdColor: string = '';
  stockIndex: any;
  isChooseColor: boolean = false;
  stockId: string = '';
  //size
  statusClassSizeBtn = 'btn-not-active';
  selectedSize: string = '';
  currentSize: string = '';
  stockIdSize: string = '';
  quantity!: number;
  isChooseSize: boolean = false;

  // quantity attr
  counterQuantity: number = 1;

  authenticated: boolean = false;
  constructor(
    private _CartService: CartService,
    private _Renderer: Renderer2,
    private _toaster: ToastrService,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    public _Translate: TranslateService,
    private _HomeProductsService: HomeProductsService,
    private _AuthService: AuthService
  ) {}
  // ngAfterContentChecked(): void {
  //   if(this.cartDetailsItems == undefined){
  //     this.cartDetailsItems = ''
  //   }

  // }

  ngOnInit(): void {
    this.customSpinIsLoading = true;

    this.getCartUserId = this._CartService.getCartUser().subscribe({
      next: response => {
        this.cartDetails = response.data;
        this.cartDetailsItems = response.data.items;
        this.totalCount = response.data.totalQuantity;
        this._CartService.cartNumber.next(this.totalCount);
        this.customSpinIsLoading = false;
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });
  }

  // update Color and Size
  getStockDataPro(id: any): void {
    this.customSpinIsLoading = true;
    this.getProductDetailsId = this._HomeProductsService.getProductDetails(id).subscribe({
      next: res => {
        this.productStock = res?.data.stocks;

        this.productStockColor = this.productStock;
        this.productStockColor = this.productStockColor.reduce((a: any[], b: { colorId: any }) => {
          if (!a.find(data => data.color.id == b.colorId)) {
            a.push(b);
          }
          return a;
        }, []);
        this.customSpinIsLoading = false;
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });
  }

  onColorChange(event: any, index: number) {
    this.selectedColor = event?.color?.enName;
    this.currentColor = event?.color?.id;
    this.stockIdColor = event?.id;
    this.stockIndex = index;
    this.counterQuantity = 1;
    this.stockIdSize = '';
  }
  isChooseColorFun() {
    this.isChooseColor = true;
  }

  // size
  isChooseSizeFun() {
    this.isChooseSize = true;
  }
  onSizeChange(event: any) {
    this.selectedSize = event?.size;
    this.currentSize = event?.sizeId;
    this.stockIdSize = event?.stockId;
    this.quantity = event?.quantity;
    this.counterQuantity = 1;
  }
  // Quantity Fun
  plusCounterQuantity(): void {
    this.counterQuantity++;
  }

  minCounterQuantity(): void {
    if (this.counterQuantity > 1) {
      this.counterQuantity--;
    } else {
      this.counterQuantity = 1;
    }
  }

  // Adjust quantity
  changeCount(
    count: any,
    stockId: string,
    element1: HTMLButtonElement,
    element2: HTMLButtonElement
  ): void {
    this.customSpinIsLoading = true;
    if (count > 0) {
      this._Renderer.setAttribute(element1, 'disabled', 'true');
      this._Renderer.setAttribute(element2, 'disabled', 'true');
      this.addToCartId = this._CartService.addToCart(stockId, count).subscribe({
        next: response => {
          this.cartDetails = response.data;
          this._CartService.cartNumber.next(response.data.totalQuantity);
          this.cartDetailsItems = response.data.items;

          this._Renderer.removeAttribute(element1, 'disabled');
          this._Renderer.removeAttribute(element2, 'disabled');
          this.totalCount = response.data.totalQuantity;
          this.customSpinIsLoading = false;
        },
        error: () => {
          this._Renderer.removeAttribute(element1, 'disabled');
          this._Renderer.removeAttribute(element2, 'disabled');
          this.customSpinIsLoading = false;
        },
      });
    } else {
      count = 1;
    }
  }

  // Remove item
  removeItem(itemId: string, element: HTMLElement): void {
    this.customSpinIsLoading = true;
    this._Renderer.setAttribute(element, 'disabled', 'true');

    this._CartService.removeCartItem(itemId).subscribe({
      next: res => {
        this.cartDetails = res.data;
        this.cartDetailsItems = res.data.items;
        this._Renderer.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(res.data.totalQuantity);
        this._toaster.success('Removed Your Item Successfuly');
        this.customSpinIsLoading = false;
      },
      error: () => {
        this._toaster.info('Your Item Not Removed');
        this.customSpinIsLoading = false;
      },
    });
  }
  // update color&Size
  //Remove stock id first
  removeStockId(element: HTMLElement, productId: string): void {
    if (this.isChooseColor && this.isChooseSize === true && this.stockIdSize != '') {
      this._Renderer.setAttribute(element, 'disabled', 'true');
      this.customSpinIsLoading = true;
      this.isFormVisible = false;
      this._CartService.removeCartItem(this.stockId).subscribe({
        next: () => {
          this.updateCartProduct(productId, this.counterQuantity);
        },
        error: () => {
          this._toaster.info('Your Item Not Updated');
          this.customSpinIsLoading = false;
        },
      });
    } else {
      this._toaster.info('Should be Choose Color and Size');
    }
  }
  //Update

  updateCartProduct(itemId: string, quantity: any) {
    const requiredCount: string = quantity.toString();
    this._CartService.addToCart(itemId, requiredCount).subscribe({
      next: res => {
        this.cartDetails = res.data;
        this.cartDetailsItems = res.data.items;
        this.totalCount = res.data.totalQuantity;
        this._CartService.cartNumber.next(this.totalCount);

        this.customSpinIsLoading = false;
        this._toaster.success('Updated successfuly');
      },
      error: () => {
        this._toaster.info('Your Item Not Updated');
      },
    });
  }

  // Delete Confirmation
  openDeleteSituation() {
    this.checkedDeleteAll = true;
  }
  confirmationDel() {
    this.confirmDeleteAll = true;
  }
  cancelDelete() {
    this.checkedDeleteAll = false;
  }
  // Clear Cart
  clearAllItems(element: HTMLElement): void {
    if (this.confirmDeleteAll == true) {
      this.customSpinIsLoading = true;
      this._Renderer.setAttribute(element, 'disabled', 'true');
      this._CartService.clearCart().subscribe({
        next: response => {
          this._toaster.success('Your Cart Is Empty');
          this.cartDetails = response.data;
          this._CartService.cartNumber.next(response.data.totalQuantity);
          this.totalCount = response.data.totalQuantity;
          window.location.reload();
        },
        error: () => {
          this._toaster.info('Your Items are Not Deleted !!');
          this.customSpinIsLoading = false;
        },
      });
    }
  }

  toggleForm(stockId: string) {
    this.isFormVisible = !this.isFormVisible;
    this.toggleBodyScroll(this.isFormVisible);
    this.stockId = stockId;
  }
  private toggleBodyScroll(isVisible: boolean) {
    if (isVisible) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }
  }

  // Rotate Arrow Details
  isRotated = false;

  toggleRotation() {
    this.isRotated = !this.isRotated;
  }

  checkedLogged(): void {
    this._AuthService.authenticated$.subscribe(response => {
      this.authenticated = response;
    });
    if (this.authenticated === true) {
      this._Router.navigate(['/payment']);
    } else {
      this._toaster.info(
        this._Translate.currentLang == 'ar'
          ? 'برجاء تسجيل الدخول لاتمام عملية الشراء'
          : 'Should be Sign in to Complete Your Order'
      );
      this._AuthService.directionURL.next('cart');
      this._Router.navigate(['/login']);
    }
  }
}
