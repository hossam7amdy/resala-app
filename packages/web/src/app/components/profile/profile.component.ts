import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  constructor(
    private _UserInfo: UserService,
    private _AuthService: AuthService,
    private _Spinner: NgxSpinnerService
  ) {}

  userInfo: any = {};
  userId: any;
  isLoaded: boolean = false;

  ngOnInit(): void {
    this._Spinner.show();
    this._AuthService.decodeUser();
    this.userId = this._AuthService.userInfo.id;

    this._UserInfo.getUserInfo(this.userId).subscribe({
      next: response => {
        this.userInfo = response.data;
        this.isLoaded = true;
      },
      error: err => {
        console.log(err);
      },
    });
  }

  ngAfterViewInit(): void {
    this._Spinner.hide();
  }
}
