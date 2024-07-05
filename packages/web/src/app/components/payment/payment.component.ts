import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, PatternValidator, ReactiveFormsModule, Validators, } from '@angular/forms';
import { PaymentService } from 'src/app/core/services/payment.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(private _PaymentServices: PaymentService, private _Renderer2: Renderer2, private _Toaster: ToastrService) { }

  errMsg: string = '';
  successMsg: string = '';
  isLoading: boolean = false;
  getUserAddress: any = [];
  addressId: string = '';
  selectPayMethod: string = '';
  note: string = '';


  ngOnInit(): void {
    this._PaymentServices.getUserAddress().subscribe({
      next: response => {
        this.getUserAddress = response.data;
        this.addressId = this.getUserAddress[0].id
      },
      error: err => {
        console.log(err);
      }
    })
  }



  addressForm: FormGroup = new FormGroup({
    state: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required
    ]),
    street: new FormControl('', [
      Validators.required
    ]),

    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ]),

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

    building: new FormControl(''),  //optional
    floor: new FormControl('', [Validators.pattern('^[1-9][0-9]?$'), Validators.required]),
    // [1-9][0-9]*
    address: new FormControl(''), //optional

  })



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
            this._Toaster.success("Registration successfuly")
            this.isLoading = false;
            this._Renderer2.setAttribute(btn, 'disabled', 'true')

          }
        },
        error: err => {
          this.errMsg = err.error.message;
          this._Toaster.error(this.errMsg);
          console.log(err)
          this.isLoading = false;

        },
      });
      //Email already registered
    }


  }

  // textTimer(txt:string): void {
  //   setTimeout(() => {
  //     txt;
  //   }, 3000);
  // }

  payForm: FormGroup = new FormGroup({
    paymentMethod: new FormControl('', [
      Validators.required,

    ]),

    note: new FormControl(''),
  })


  creatOrder(btn: HTMLButtonElement) {
    this.isLoading = true;
    const payData = this.payForm.value;

    if (this.payForm.valid) {
      console.log(payData);
      this._PaymentServices.userOrder(this.addressId, this.selectPayMethod, this.note).subscribe({
        next: (response) => {
          if (response.success == true) {
            console.log('dataPay', this.addressId, this.selectPayMethod, this.note)
            this._Toaster.success("Registration successfuly")
            this.isLoading = false;
            this._Renderer2.setAttribute(btn, 'disabled', 'true')

          }
        },
        error: err => {
          this.errMsg = err.error.message;
          this._Toaster.error(this.errMsg);
          console.log(err)
          this.isLoading = false;

        },
      })
    }
  }

}
