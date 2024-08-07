/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import type { OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { Router } from '@angular/router';
import type { ToastrService } from 'ngx-toastr';
import type { CartService } from 'src/app/core/services/cart.service';
import type { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _PaymentServices: PaymentService,
    private _Renderer2: Renderer2,
    private _Toaster: ToastrService,
    private _Router: Router,
    private _CartService: CartService
  ) {}

  isEdit: boolean = false;
  editIndex: any;
  isSelectesAddress: boolean = false;
  isRegisterd: boolean = false;

  errMsg: string = '';
  successMsg: string = '';
  isLoading: boolean = false;
  getUserAddress: any = [];
  addressId: string = '';
  selectPayMethod: string = '';
  note: string = '';

  // Countries
  allCountries: any = [];
  selectedCountry: string = '';
  countryIndex: number = 0;

  // States
  allCities: any = [];
  selectedState: string = '';

  // payment form

  paymentDataMethod: any = ['CASH', 'CARD'];
  paymentSelected: string = '';

  ngOnInit(): void {
    this._PaymentServices.getUserAddress().subscribe({
      next: response => {
        this.getUserAddress = response.data;
        this.addressId = this.getUserAddress[0].id;
        console.log('user address id', this.addressId);
      },
      error: err => {
        console.log(err);
      },
    });

    this._PaymentServices.getAllCountries().subscribe({
      next: response => {
        this.allCountries = response.data;

        console.log(this.allCountries);
      },
    });
  }

  selectedAddressMethod(value: string): void {
    this.addressId = value;
    this.isSelectesAddress = true;
    console.log('address id', this.addressId);
  }

  editAddressForm(index: any): void {
    this.isEdit = true;
    this.editIndex = index;
  }

  addressForm: FormGroup = new FormGroup({
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),

    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern('.*\\S.*[a-zA-Z0-9 ]'),
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern('.*\\S.*[a-zA-Z0-9 ]'),
    ]),

    building: new FormControl(''), //optional
    floor: new FormControl('', [Validators.pattern('^[1-9][0-9]?$'), Validators.required]),
    address: new FormControl(''), //optional
  });

  onSelected(value: string): void {
    this.selectedCountry = value;

    this._PaymentServices.getAllCities(value).subscribe({
      next: response => {
        this.allCities = response.data;
        console.log('Cities', this.allCities);
      },
    });
  }
  countryIndexFun(index: number): void {
    this.countryIndex = index;
    console.log('index:', this.countryIndex);
  }

  handleForm(userAddress: FormGroup, btn: HTMLButtonElement): void {
    this.isLoading = true;

    const userData = this.addressForm.value;
    console.log(userData);

    if (userAddress.valid) {
      console.log(userData);
      this._PaymentServices.registerUserAddress(userData).subscribe({
        next: response => {
          if (response.success == true) {
            // this.successMsg = 'Registration successfuly';
            this._Toaster.success('Registration successfuly');
            this.isLoading = false;
            this._Renderer2.setAttribute(btn, 'disabled', 'true');
          }
        },
        error: err => {
          this.errMsg = err.error.message;
          this._Toaster.error(this.errMsg);
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }

  // is registerd method
  isRegisterdFun(): void {
    this.isRegisterd = true;
  }
  // textTimer(txt:string): void {
  //   setTimeout(() => {
  //     txt;
  //   }, 3000);
  // }

  paymentSelectedMethod(event: any) {
    this.paymentSelected = event;
    console.log(this.paymentSelected);
  }

  payForm: FormGroup = new FormGroup({
    paymentMethod: new FormControl('', [Validators.required]),

    note: new FormControl(''),
  });

  creatOrder(btn: HTMLButtonElement) {
    this.isLoading = true;
    const payData = this.payForm.value;

    // if (this.payForm.valid) {
    console.log(payData, 'addres id', this.addressId);
    this._PaymentServices.userOrder(this.addressId, this.paymentSelected, this.note).subscribe({
      next: response => {
        if (response.success == true) {
          console.log('dataPay', this.addressId, this.paymentSelected, this.note);
          console.log(response);

          this.isLoading = false;
          this._Toaster.success('Your Order Completed');

          if (this.paymentSelected == 'CARD') {
            window.open(response.data.paymentUrl, '_self');
          } else {
            this._Router.navigate(['/home']);
          }
          this._Renderer2.setAttribute(btn, 'disabled', 'true');
          this._CartService.cartNumber.next(0);
        }
      },
      error: err => {
        this.errMsg = err.error.message;
        this._Toaster.error(this.errMsg);
        console.log(err);
        this.isLoading = false;
      },
    });
    //}
  }
}
