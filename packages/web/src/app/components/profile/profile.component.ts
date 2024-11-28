import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, SpinnerComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  constructor(
    private _UserInfo: UserService,
    private _AuthService: AuthService,
    private _Spinner: NgxSpinnerService,
    public _Translate: TranslateService
  ) {}

  userInfo: any = {};
  userId: any;
  isLoaded: boolean = false;
  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner
  ngOnInit(): void {
    this.customSpinIsLoading = true;
    this._AuthService.decodeUser();
    this.userId = this._AuthService.userInfo.id;

    this._UserInfo.getUserInfo(this.userId).subscribe({
      next: response => {
        this.userInfo = response.data;
        this.isLoaded = true;
        this.customSpinIsLoading = false;
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });
  }

  ngAfterViewInit(): void {
    this._Spinner.hide();
  }
}
