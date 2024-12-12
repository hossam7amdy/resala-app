import { CommonModule } from '@angular/common';
import { ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { User } from '@resala/shared';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { Translate_Service } from 'src/app/core/services/translate.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-nav-blank',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    SpinnerComponent,
    TranslateModule,
    FormsModule,
    SearchPipe,
  ],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent implements OnInit {
  user: User | null = null;
  customSpinIsLoading = false;
  authenticated: boolean = false;
  categoryList: any = [];

  cartNum: number = 0;
  togglerOnend: boolean = false;

  constructor(
    public translate: TranslateService,
    private _authService: AuthService,
    private _router: Router,
    private _cartService: CartService,
    private _categories: CategoriesService,
    private _renderer: Renderer2,
    private _rtlStatus: Translate_Service,
    private _homeProducts: HomeProductsService,
    private _wishListService: WishListService,
    private _toaster: ToastrService
  ) {}

  isClickedSearch: boolean = false;
  products: Product[] = [];
  searchText: string = '';

  toggleSearch(): void {
    this.isClickedSearch = true;
  }

  closeSearch(): void {
    this.isClickedSearch = false;
  }

  addProductInWishList(id: string, element: HTMLElement): void {
    this._wishListService.postWishListItems(id).subscribe({
      next: () => {
        this._renderer.setStyle(element, 'font-weight', 'bold');
        this._toaster.success('Added in Your Favorite List');
      },
      error: err => {
        const errMsg = err.error.message || 'Something went wrong';
        this._toaster.error(errMsg);
      },
    });
  }

  searchProducts(): void {
    if (this.searchText !== '') {
      this._homeProducts.getProductsSearch(this.searchText).subscribe({
        next: response => {
          this.products = response.data.products;
        },
        error: err => {
          const errMsg = err.error.message || 'Something went wrong';
          this._toaster.error(errMsg);
        },
      });
    }
  }

  @ViewChild('navbar') navbarElement!: ElementRef;

  @HostListener('window:scroll')
  onScrollSecond(): void {
    if (scrollY > 600) {
      this._renderer.setStyle(this.navbarElement.nativeElement, 'top', 0);
    } else {
      this._renderer.removeStyle(this.navbarElement.nativeElement, 'top');
    }
  }
  currentLang: string = 'ar';
  langStorage: string = localStorage.getItem('language') ?? this.currentLang;

  switchLanguage(lang: string): void {
    this.customSpinIsLoading = true;
    localStorage.setItem('language', lang);
    this.langStorage = lang;
    window.location.reload();
    this.translate.use(this.langStorage);
    this.changePageDirection(lang);
    if (lang == 'ar') {
      this.currentLang = 'en';
      this._rtlStatus.rTLStatus.next(lang);
    } else {
      this.currentLang = 'ar';
      this._rtlStatus.rTLStatus.next(lang);
    }
    this.customSpinIsLoading = false;
  }

  ngOnInit(): void {
    this._authService.userInfo$.subscribe(user => {
      this.user = user;
      this.authenticated = !!user && !user?.isAnonymous;
    });

    this.customSpinIsLoading = true;
    if (this.langStorage === null) {
      this.translate.defaultLang;
      this.currentLang = 'ar';
    } else {
      this.translate.use(this.langStorage);
      if (this.langStorage === 'en') {
        this.currentLang = 'ar';
      } else {
        this.currentLang = 'en';
      }
    }
    this.changePageDirection(this.langStorage);

    this._cartService.cartNumber.subscribe({
      next: response => {
        this.cartNum = response;
        this.customSpinIsLoading = false;
      },
      error: err => {
        const errMsg = err.error.message || 'Something went wrong';

        this.cartNum = 0;
        this._toaster.error(errMsg);
        this.customSpinIsLoading = false;
      },
    });

    this._cartService.getCartUser().subscribe({
      next: response => {
        this.cartNum = response.data.totalQuantity;
        this.customSpinIsLoading = false;
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });

    this._categories.getCategories().subscribe({
      next: response => {
        this.categoryList = response.data;
        this.customSpinIsLoading = false;
      },
      error: err => {
        const errMsg = err.error.message || 'Something went wrong';
        this._toaster.error(errMsg);
        this.customSpinIsLoading = false;
      },
    });
  }

  // Change page Direction as per Selected Lang
  changePageDirection(lang: string) {
    this.customSpinIsLoading = true;
    const html = document.getElementsByTagName('html')[0];
    if (lang === 'ar') {
      html.dir = 'rtl';
      html.lang = 'ar';
    } else {
      html.dir = 'ltr';
      html.lang = 'en';
    }
    this.customSpinIsLoading = false;
  }

  isTogglerOpend(): void {
    if (this.togglerOnend == false) {
      this.togglerOnend = true;
    } else {
      this.togglerOnend = false;
    }
  }

  handleLogout(): void {
    this.customSpinIsLoading = true;
    this._authService.logout().subscribe({
      next: () => {
        this.customSpinIsLoading = false;
        this._router.navigate(['/']);
      },
      error: err => {
        const errMsg = err?.error?.message || 'Something went wrong';
        this._toaster.error(errMsg);
        this.customSpinIsLoading = false;
      },
    });
  }
}
