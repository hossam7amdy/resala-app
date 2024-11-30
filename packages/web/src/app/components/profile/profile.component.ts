import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthUser } from '@resala/shared';
import { NgxSpinnerService } from 'ngx-spinner';
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
export class ProfileComponent implements OnInit, AfterViewInit {
  constructor(
    public translate: TranslateService,
    private _authService: AuthService,
    private _spinner: NgxSpinnerService
  ) {}

  isLoaded: boolean = false;
  userInfo: AuthUser | null = null;

  ngOnInit(): void {
    this._spinner.show();
    this._authService.userInfo$.subscribe(data => {
      this.userInfo = data;
      this.isLoaded = true;
    });
  }

  ngAfterViewInit(): void {
    this._spinner.hide();
  }
}
