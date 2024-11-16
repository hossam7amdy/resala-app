import { CommonModule } from '@angular/common';
import { ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { CognitoService } from 'src/app/core/services/cognito.service';
import { HomeProductsService } from 'src/app/core/services/home-products.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
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
  constructor(
    private router: Router,
    private cartService: CartService,
    private categories: CategoriesService,
    private renderer: Renderer2,
    private cognitoService: CognitoService,
    private authenticator: AuthenticatorService,
    public translate: TranslateService,
    private rtlStatus: LocalizationService,
    private homeProducts: HomeProductsService,
    private wishListService: WishListService,
    private toaster: ToastrService
  ) {}

  cartNum: number = 0;
  authenticated: boolean = false;
  userNameLogged: string = 'Login';

  categoryList: any = [];
  isClickedSearch: boolean = false;
  products: Product[] = [];
  searchText: string = '';

  togglerOpened: boolean = false;
  customSpinIsLoading = false;

  toggleSearch(): void {
    this.isClickedSearch = true;
  }

  closeSearch(): void {
    this.isClickedSearch = false;
  }

  addProductInWishList(id: string, element: HTMLElement): void {
    this.wishListService.postWishListItems(id).subscribe({
      next: () => {
        this.renderer.setStyle(element, 'font-weight', 'bold');
        this.toaster.success('Added in Your Favorite List');
      },
      error: () => {
        this.toaster.error('Should be Login !!');
        this.router.navigate(['/login']);
      },
    });
  }

  searchProducts(): void {
    if (this.searchText !== '') {
      this.homeProducts.getProductsSearch(this.searchText).subscribe({
        next: response => {
          this.products = response.data.products;
        },
        error: () => {},
      });
    }
  }

  @ViewChild('navbar') navbarElement!: ElementRef;

  @HostListener('window:scroll')
  onScrollSecond(): void {
    if (scrollY > 600) {
      this.renderer.setStyle(this.navbarElement.nativeElement, 'top', 0);
    } else {
      this.renderer.removeStyle(this.navbarElement.nativeElement, 'top');
    }
  }
  currentLang: string = 'ar';
  langStorage: string = localStorage.getItem('language') || 'ar';

  async switchLanguage(lang: string): Promise<void> {
    try {
      this.langStorage = lang;
      this.customSpinIsLoading = true;

      await this.cognitoService.updateUserLocale(lang);
    } catch (_err) {
      // TODO: Toast error
    } finally {
      localStorage.setItem('language', lang);

      this.translate.use(this.langStorage);
      this.changePageDirection(lang);

      window.location.reload();

      if (lang == 'ar') {
        this.currentLang = 'en';
        this.rtlStatus.rTLStatus.next(lang);
      } else {
        this.currentLang = 'ar';
        this.rtlStatus.rTLStatus.next(lang);
      }

      this.customSpinIsLoading = false;
    }
  }

  ngOnInit(): void {
    this.authenticated = this.authenticator.authStatus === 'authenticated';

    this.authenticator.subscribe(auth => {
      this.authenticated = auth.authStatus === 'authenticated';
    });

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

    this.cartService.cartNumber.subscribe({
      next: response => {
        this.cartNum = response;
      },
      error: _err => {
        this.cartNum = 0;
        // TODO: Toast error
      },
      complete: () => {
        this.customSpinIsLoading = false;
      },
    });

    this.cartService.getCartUser().subscribe({
      next: response => {
        this.cartNum = response.data.totalQuantity;
      },
      error: _err => {
        // TODO: Toast error
      },
      complete: () => {
        this.customSpinIsLoading = false;
      },
    });

    this.categories.getCategories().subscribe({
      next: response => {
        this.categoryList = response.data;
      },
      error: _err => {
        // TODO: Toast error
      },
      complete: () => {
        this.customSpinIsLoading = false;
      },
    });
  }

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

  isTogglerOpened(): void {
    if (this.togglerOpened == false) {
      this.togglerOpened = true;
    } else {
      this.togglerOpened = false;
    }
  }

  async signOut(): Promise<void> {
    try {
      this.customSpinIsLoading = true;
      await this.cognitoService.signOut();
    } catch (_err) {
      // TODO: Toast error
    } finally {
      this.customSpinIsLoading = false;
      this.authenticated = false;
    }
  }
}
