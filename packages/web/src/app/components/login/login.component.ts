import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  PatternValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { Router } from '@angular/router';
import type { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) {}
  errMsg: string = '';
  successMsg: string = '';
  isLoading: boolean = false;

  // can use FormBulder instead of  new FormGroup (lookup leson 9)

  loginForm: FormGroup = new FormGroup({
    password: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/\d/),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[ !@#$%^&*()_=~.,+-:;'"\\|<>\/?]/),
        Validators.minLength(8),
      ])
    ),

    sign: new FormControl('', [Validators.required, Validators.email]),
  });

  handleForm(loginForm: FormGroup): void {
    this.isLoading = true;

    const userData = this.loginForm.value;

    if (this.loginForm.valid === true) {
      console.log('data is valed');
      console.log(userData);
      // let loginData = userData
      this._AuthService.login(userData).subscribe({
        next: response => {
          console.log(response.data.accessToken);
          if (response.success == true) {
            localStorage.setItem('etoken', response.data.accessToken);
            this._AuthService.decodeUser();
            this.successMsg = 'Logged already';
            this.isLoading = false;
            this._Router.navigate(['/home']);
          }
        },
        error: err => {
          this.errMsg = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
