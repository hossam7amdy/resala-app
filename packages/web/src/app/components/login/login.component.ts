import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  PatternValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

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

  //show password
  showPW: any;
  togglePW() {
    this.showPW = !this.showPW;
  }

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

    sign: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /(^[0-9]{11,11}$)|(^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+))?$/
      ),
    ]),
  });

  //|| Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/)
  // /^01[0125][0-9]{8}$/

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
