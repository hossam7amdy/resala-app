import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    });

    if (this.tokenFromSocial !== '') {
      localStorage.setItem('accessToken', this.tokenFromSocial);
      this._AuthService.decodeUser();
      const productId = localStorage.getItem('productId');
      if (productId == null) {
        this._Router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      } else {
        this._Router.navigate(['product-details/', productId]).then(() => {
          window.location.reload();
        });
        localStorage.removeItem('productId');
      }
    }
  }
}
