import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-callback-social-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './callback-social-accounts.component.html',
  styleUrls: ['./callback-social-accounts.component.css'],
})
export class CallbackSocialAccountsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  tokenFromSocial: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(token => {
      this.tokenFromSocial = token['accessToken'];
      console.log('token', this.tokenFromSocial);
    });

    if (this.tokenFromSocial !== '') {
      localStorage.setItem('etoken', this.tokenFromSocial);
      this._AuthService.decodeUser();
      const productId = localStorage.getItem('productId');
      if (productId == null) {
        this._Router.navigate(['/home']).then(() => {
          window.location.reload();
        });
        console.log('product id' + productId);
      } else {
        console.log('product id' + productId);

        this._Router.navigate(['product-details/', productId]).then(() => {
          window.location.reload();
        });
        localStorage.removeItem('productId');
      }
    }
  }
}
