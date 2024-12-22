import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { User } from '@resala/shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, SpinnerComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    public translate: TranslateService,
    private _authService: AuthService,
    private _spinner: NgxSpinnerService
  ) {}

  userInfo: User | null = null;
  customSpinIsLoading: boolean = false;

  //Subscription ID
  userInfoId!: Subscription;
  ngOnInit(): void {
    this.customSpinIsLoading = true;
    this.userInfoId = this._authService.userInfo$.subscribe(data => {
      this.userInfo = data;
      this.customSpinIsLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this._spinner.hide();
  }

  ngOnDestroy(): void {
    if (this.userInfoId) this.userInfoId.unsubscribe();
  }
}
