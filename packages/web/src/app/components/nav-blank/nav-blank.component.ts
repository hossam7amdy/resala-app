import { CommonModule } from '@angular/common';
import { ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { Translate_Service } from 'src/app/core/services/translate.service';
import { UserService } from 'src/app/core/services/user.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
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
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _CartService: CartService,
    private _Categories: CategoriesService,
    private route: ActivatedRoute,
    private _Renderer: Renderer2,
    private UserProfile: UserService,
    public _Translate: TranslateService,
    private _RTLStatus: Translate_Service,
    private _HomeProducts: HomeProductsService,
    private _WishListService: WishListService,
    private _Toaster: ToastrService
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

  //Add product in Wish list method
  addPoductInWishList(id: any, element: HTMLElement): void {
    this._WishListService.postWishListItems(id).subscribe({
      next: response => {
        this._Renderer.setStyle(element, 'font-weight', 'bold');
        this._Toaster.success('Added in Your Favorite List');
        console.log(response);
      },
      error: err => {
        this._Toaster.error('Should be Login !!');
        this._Router.navigate(['/login']);
        // if (err.statusText == 'Unauthorized'|| err.error.message == 'JWT token is missing or invalid' || err.error.message == 'jwt expired') {

        // } else {
        //   this._Toaster.error(err.message);
        // }
        console.log(err);
      },
    });
  }

  searchProducts(): void {
    if (this.searchText !== '') {
      this._HomeProducts.getProductsSearch(this.searchText).subscribe({
        next: response => {
          this.products = response.data.products;
          console.log(this.products);
          console.log(this.searchText);
        },
        error: err => {
          console.log(err);
        },
      });
    }
  }
  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner

  // attributes
  userNameLogged: string = 'Login';
  userId: any;
  signOut: boolean = false;
  isToken: string | null = '';
  categoryList: any = [];

  cartNum: number = 0;
  togglerOpend: boolean = false;

  @ViewChild('navbar') navbarElement!: ElementRef;

  @HostListener('window:scroll')
  onScrollSecond(): void {
    if (scrollY > 600) {
      this._Renderer.setStyle(this.navbarElement.nativeElement, 'top', 0);
    } else {
      this._Renderer.removeStyle(this.navbarElement.nativeElement, 'top');
    }
  }
  currentLang: string = 'ar';
  langStorage: any = localStorage.getItem('language');

  switchLanguage(lang: string): void {
    this.customSpinIsLoading = true;
    localStorage.setItem('language', lang);
    this.langStorage = localStorage.getItem('language');
    window.location.reload();
    this._Translate.use(this.langStorage);
    this.changePageDirection(lang);
    if (lang == 'ar') {
      this.currentLang = 'en';
      this._RTLStatus.rTLStatus.next(lang);
    } else {
      this.currentLang = 'ar';
      this._RTLStatus.rTLStatus.next(lang);
    }
    this.customSpinIsLoading = false;
    console.log('Language' + lang, this.currentLang);
  }

  ngOnInit(): void {
    this.customSpinIsLoading = true;
    if (this.langStorage === null) {
      this._Translate.defaultLang;
      this.currentLang = 'ar';
    } else {
      this._Translate.use(this.langStorage);
      if (this.langStorage === 'en') {
        this.currentLang = 'ar';
      } else {
        this.currentLang = 'en';
      }
    }
    this.changePageDirection(this.langStorage);

    // this.signOut = this._AuthService.signOut;
    this.isToken = localStorage.getItem('etoken');
    if (this.isToken == null || this.isToken == '') {
      this.signOut = false;
    } else {
      this._AuthService.decodeUser();
      this.userId = this._AuthService.userInfo?.id;
    }

    this.getUserInfo(this.userId);

    this._CartService.cartNumber.subscribe({
      next: response => {
        console.log('cart number', response);
        this.cartNum = response;
        this.customSpinIsLoading = false;
      },
      error: err => {
        this.cartNum = 0;
        console.log(err);
        this.customSpinIsLoading = false;
      },
    });

    this._CartService.getCartUser().subscribe({
      next: response => {
        this.cartNum = response.data.totalQuantity;
        this.customSpinIsLoading = false;
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });

    this._Categories.getCategories().subscribe({
      next: response => {
        this.categoryList = response.data;
        this.customSpinIsLoading = false;
      },
      error: err => {
        console.log(err);
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
    if (this.togglerOpend == false) {
      this.togglerOpend = true;
    } else {
      this.togglerOpend = false;
    }
  }

  getUserInfo(userId: any): void {
    this.UserProfile.getUserInfo(userId).subscribe({
      next: response => {
        this._AuthService.userNameLogged.next(response.data.firstName);
        this.userNameLogged = response.data.firstName;
        this.signOut = true;
      },
      error: err => {
        if (err.status == 401 || err.status == 403) {
          this.signOut = false;
        }
      },
    });
  }

  reloadPage(id: any): void {
    this.customSpinIsLoading = true;
    window.location.replace(`/category/${id}`);
    this.customSpinIsLoading = false;
  }

  removeTokenSignOut(): void {
    this.signOut = false;
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
    if (this._AuthService.signOut == null) {
      this.cartNum = 0;
    } else {
      this.cartNum = this._CartService.cartNumber.value;
    }

    this.userNameLogged = 'Login';
  }
}
