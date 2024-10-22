import { CommonModule } from '@angular/common';
import { OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { HomeProductsService } from 'src/app/core/services/home-products.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartDetails: any = {};
  cartDetailsItems: any = [];
  checkedDeleteAll: boolean = false;
  confirmDeleteAll: boolean = false;
  totalCount: number = 0;
  // update color and size
  productStock: any = [];
  productStockColor: any = [];
  productStockSize: any = [];
  currentColor: string = '';
  selectedColor: string = '';
  stockIdColor: string = '';
  stockIndex: any;
  isChooseColor: boolean = false;
  //size
  statusClassSizeBtn = 'btn-not-active';
  selectedSize: string = '';
  currentSize: string = '';
  stockIdSize: string = '';
  quantity: string = '';
  isChooseSize: boolean = false;

  // quantity attr
  counterQuantity: number = 1;
  constructor(
    private _CartService: CartService,
    private _Renderer: Renderer2,
    private _toaster: ToastrService,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    public _Translate: TranslateService,
    private _HomeProductsService: HomeProductsService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this._CartService.getCartUser().subscribe({
      next: response => {
        console.log(response);
        this.cartDetails = response.data;
        this.cartDetailsItems = response.data.items;
        this.totalCount = response.data.totalQuantity;
      },
      error: err => {
        console.log(err);
      },
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  // update Color and Size
  getStockDataPro(id: any): void {
    this.spinner.show();
    this._HomeProductsService.getProductStock(id).subscribe({
      next: res => {
        this.productStock = res?.data.stocks;

        console.log('stock', this.productStock);

        this.productStockColor = this.productStock;
        this.productStockColor = this.productStockColor.reduce((a: any[], b: { colorId: any }) => {
          if (!a.find(data => data.color.id == b.colorId)) {
            a.push(b);
          }
          return a;
        }, []);

        console.log('after filter', this.productStockColor);
      },
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  onColorChange(event: any, index: number) {
    this.selectedColor = event?.color?.enName;
    this.currentColor = event?.color?.id;
    this.stockIdColor = event?.id;
    this.stockIndex = index;
    console.log(this.selectedColor, this.stockIndex);
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
    console.log(this.selectedSize, this.stockIdSize);
  }
  // Quantity Fun
  plusCounterQuantity(): void {
    this.spinner.show();
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
    this.spinner.show();
    if (count > 0) {
      this._Renderer.setAttribute(element1, 'disabled', 'true');
      this._Renderer.setAttribute(element2, 'disabled', 'true');
      this._CartService.addToCart(stockId, count).subscribe({
        next: response => {
          this.cartDetails = response.data;
          this._CartService.cartNumber.next(response.data.totalQuantity);
          this.cartDetailsItems = response.data.items;

          console.log(this.cartDetails);
          this._Renderer.removeAttribute(element1, 'disabled');
          this._Renderer.removeAttribute(element2, 'disabled');
          this.totalCount = response.data.totalQuantity;
        },
        error: err => {
          console.log(err);
          this._Renderer.removeAttribute(element1, 'disabled');
          this._Renderer.removeAttribute(element2, 'disabled');
        },
      });
    } else {
      count = 1;
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  // Remove item
  removeItem(itemId: string, element: HTMLElement): void {
    this.spinner.show();
    this._Renderer.setAttribute(element, 'disabled', 'true');

    this._CartService.removeCartItem(itemId).subscribe({
      next: res => {
        this.cartDetails = res.data;
        this.cartDetailsItems = res.data.items;
        this._Renderer.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(res.data.totalQuantity);
        this._toaster.success('Removed Your Item Successfuly');
      },
      error: () => {
        this._toaster.info('Your Item Not Removed');
      },
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  // update color&Size
  //Remove stock id first
  removeStockId(itemId: string, element: HTMLElement, productId: string, quantity: any): void {
    if (this.isChooseColor && this.isChooseSize === true) {
      this.spinner.show();
      this._Renderer.setAttribute(element, 'disabled', 'true');

      this._CartService.removeCartItem(itemId).subscribe({
        next: res => {
          this.cartDetails = res.data;
          this.cartDetailsItems = res.data.items;
          this._Renderer.removeAttribute(element, 'disabled');
          this._CartService.cartNumber.next(res.data.totalQuantity);

          this.updateCartProduct(productId, quantity);
        },
        error: () => {
          this._toaster.info('Your Item Not Removed');
        },
      });
    } else {
      this._toaster.info('should be choose color and size');
    }
  }
  //Update
  // updateCartProduct(stockIdSize, item.quantity)

  updateCartProduct(productId: string, quantity: any) {
    this._CartService.addToCart(productId, quantity).subscribe({
      next: res => {
        console.log(res);
        this._CartService.cartNumber.next(res.data.totalQuantity);
        console.log('cart number :' + this._CartService.cartNumber);
        window.location.reload();
        this._toaster.success('Update product successfuly');
      },
      error: err => {
        this._toaster.error(err);
        console.log('response', productId, quantity, err);
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
    this.spinner.show();
    if (this.confirmDeleteAll == true) {
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
        },
      });
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  // Edit on Size & Color Form
  isFormVisible = false;

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
    this.toggleBodyScroll(this.isFormVisible);
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
}
