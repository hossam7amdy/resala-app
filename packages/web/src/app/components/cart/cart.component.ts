import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  cartDetails: any = {};
  cartDetailsItems: any = [];
  checkedDeleteAll: boolean = false;
  confirmDeleteAll: boolean = false;



  // quantity attr
  counterQuantity: number = 1;
  constructor(
    private _CartService: CartService,
    private _Renderer: Renderer2,
    private _toaster: ToastrService,
    private _Router: Router


  ) { }

  ngOnInit(): void {

    this._CartService.getCartUser().subscribe({
      next: response => {
        console.log(response);
        this.cartDetails = response.data;
        this.cartDetailsItems = response.data.items;

      },
      error: err => {
        console.log(err);
      }
    })


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
  changeCount(count: any, stockId: string, element1: HTMLButtonElement, element2: HTMLButtonElement): void {
    if (count > 0) {
      this._Renderer.setAttribute(element1, 'disabled', 'true');
      this._Renderer.setAttribute(element2, 'disabled', 'true');
      this._CartService.addToCart(stockId, count).subscribe({
        next: (response) => {
          this.cartDetails = response.data;
          this._CartService.cartNumber.next(response.data.totalQuantity);
          this.cartDetailsItems = response.data.items;

          console.log(this.cartDetails)
          this._Renderer.removeAttribute(element1, 'disabled');
          this._Renderer.removeAttribute(element2, 'disabled');

        },
        error: (err) => {
          console.log(err);
          this._Renderer.removeAttribute(element1, 'disabled');
          this._Renderer.removeAttribute(element2, 'disabled');

        }
      })
    } else {
      count = 1;
    }
  }

  // Remove item
  removeItem(itemId: string, element: HTMLElement): void {
    this._Renderer.setAttribute(element, 'disabled', 'true')

    this._CartService.removeCartItem(itemId).subscribe({
      next: res => {
        this.cartDetails = res.data;
        this.cartDetailsItems = res.data.items;
        this._Renderer.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(res.data.totalQuantity);
        this._toaster.success('Removed Your Item Successfuly');
      },
      error: err => {
        this._toaster.info('Your Item Not Removed');
      }
    })
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
      this._Renderer.setAttribute(element, 'disabled', 'true');
      this._CartService.clearCart().subscribe({
        next: response => {
          this._toaster.success('Your Cart Is Empty');
          this.cartDetails = response.data;
          this._CartService.cartNumber.next(response.data.totalQuantity);
        },
        error: err => {
          this._toaster.info('Your Items are Not Deleted !!')
        }
      })
    }

  }

}
