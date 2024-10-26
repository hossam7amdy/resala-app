import { CommonModule } from '@angular/common';
import { OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CityService } from 'src/app/core/services/cities.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent, TranslateModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _PaymentServices: PaymentService,
    private _Renderer2: Renderer2,
    private _Toaster: ToastrService,
    private _Router: Router,
    private _CartService: CartService,
    private _AuthService: AuthService,
    private _CityService: CityService,
    public _Translate: TranslateService
  ) {}
  governorates: any[] = [];
  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner
  userLoginId: number = 0;
  isEdit: boolean = false;
  editIndex: any;
  isSelectedAddress: boolean = false;
  isRegisterd: boolean = false;
  addNew: boolean = false;
  firstRegister: boolean = false;
  errMsg: string = '';
  successMsg: string = '';
  isLoading: boolean = false;
  getUserAddress: any = [];
  addressId: number = 0;
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

  paymentDataMethod: any = [
    {
      enMethod: 'CASH',
      arMethod: 'الدفع عند الاستلام',
    },
    {
      enMethod: 'CARD',
      arMethod: 'فيزا بنكية',
    },
  ];
  paymentSelected: string = '';

  ngOnInit(): void {
    this.customSpinIsLoading = true;

    this._CityService.getCities().subscribe({
      next: data => {
        this.governorates = data.governorates;
        console.log(data);
      },
      error: err => {
        console.error(err);
      },
    });

    this._AuthService.decodeUser();
    this.userLoginId = this._AuthService.userInfo.id;

    console.log('user info', this.userLoginId);
    console.log(this._AuthService.userInfo, typeof this.userLoginId);
    this.addressForm.patchValue({ userId: this.userLoginId });
    this._PaymentServices.getListAddressUser(this.userLoginId).subscribe({
      next: response => {
        this.getUserAddress = response.data;
        if (this.getUserAddress.length == 0) {
          this.firstRegister = true;
        }
        this.customSpinIsLoading = false;
        console.log(response);

        console.log('user address id', this.getUserAddress);
      },
      error: err => {
        console.log(err);
        this.customSpinIsLoading = false;
      },
    });

    this._PaymentServices.getAllCountries().subscribe({
      next: response => {
        this.allCountries = response.data;
        this.customSpinIsLoading = false;
        console.log(this.allCountries);
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });
  }

  selectedAddressMethod(value: number): void {
    this.customSpinIsLoading = true;
    this.addressId = value;
    this.isSelectedAddress = true;
    this.isRegisterd = true;
    this.addNew = false;
    console.log('address id', this.addressId);
    this.customSpinIsLoading = false;
  }
  addNewAddressFun(trarget: HTMLElement): void {
    this.customSpinIsLoading = true;
    this.addNew = true;
    trarget.scrollIntoView({ behavior: 'smooth' });
    this.customSpinIsLoading = false;
  }

  addressForm: FormGroup = new FormGroup({
    userId: new FormControl('', [Validators.required]),
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

  userAddresses: FormGroup = new FormGroup({
    userId: new FormControl('', [Validators.required]),
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
    addressId: new FormControl(''), //optional
  });

  onSelected(value: string): void {
    this.customSpinIsLoading = true;
    this.selectedCountry = value;

    this._PaymentServices.getAllCities(value).subscribe({
      next: response => {
        this.allCities = response.data;
        console.log('Cities', this.allCities);
        this.customSpinIsLoading = false;
      },
      error: () => {
        this.customSpinIsLoading = false;
      },
    });
  }
  countryIndexFun(index: number): void {
    this.countryIndex = index;
    console.log('index:', this.countryIndex);
  }

  handleForm(addressForm: FormGroup, btn: HTMLButtonElement): void {
    this.customSpinIsLoading = true;

    const userData = this.addressForm.value;
    console.log('user data', userData);

    if (addressForm.valid) {
      console.log('user data2', userData);
      this._PaymentServices.registerUserAddress(userData).subscribe({
        next: response => {
          if (response.success == true) {
            // this.successMsg = 'Registration successfuly';
            this.addressId = response.data.id;
            this._Toaster.success('Save Your Address successfuly');
            this.isLoading = false;
            this._Renderer2.setAttribute(btn, 'disabled', 'true');
            this.isRegisterd = true;
            this.addNew = false;
            this.firstRegister = false;
            console.log('response register', response);
          }
          this.customSpinIsLoading = false;
        },
        error: err => {
          this.errMsg = err.error.message;
          this._Toaster.error(this.errMsg);
          console.log('Save Address Error', err);
          this.customSpinIsLoading = false;
        },
      });
    }
  }
  editAddressForm(index: any): void {
    this.isEdit = true;
    this.editIndex = index;
    const userNumberId = Number(this.userLoginId); // parsing to number

    this.userAddresses.patchValue({ userId: userNumberId });
  }

  updateAddress(userAddressId: number, userAddresses: FormGroup, element: HTMLButtonElement): void {
    this.customSpinIsLoading = true;
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    const userData = this.userAddresses.value;
    if (userAddresses.valid) {
      console.log('user address edits', this.userAddresses.value, userAddressId);

      this._PaymentServices.updateUserAddress(userAddressId, userData).subscribe({
        next: response => {
          console.log('request true user address edits', this.userAddresses.value, userAddressId);
          this._Toaster.success('Updated Your Address successfuly');
          this.isEdit = false;
          console.log('after edit', response);
          this._Renderer2.setAttribute(element, 'disabled', 'true');
          this.customSpinIsLoading = false;
        },
        error: err => {
          console.log(err);
          this._Toaster.error(this.errMsg);
          console.log('request false user address edits', this.userAddresses.value, userAddressId);
          this.customSpinIsLoading = false;
        },
      });
    }
    this.customSpinIsLoading = false;
  }

  // textTimer(txt:string): void {
  //   setTimeout(() => {
  //     txt;
  //   }, 3000);
  // }
  removeItem(addressId: number, element: HTMLElement): void {
    this.customSpinIsLoading = true;
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._PaymentServices.deleteUserAddress(this.userLoginId, addressId).subscribe({
      next: response => {
        this.getUserAddress = response.data;
        this._Renderer2.removeAttribute(element, 'disabled');
        this._Toaster.success('Removed Your Address Successfuly');
        window.location.reload();
        this.isRegisterd = false;
        this.isEdit = false;
        this.customSpinIsLoading = false;
      },
      error: err => {
        this._Toaster.info('Your Item Not Removed');
        console.log(err);
        this.customSpinIsLoading = false;
      },
    });
  }

  paymentSelectedMethod(event: any) {
    this.customSpinIsLoading = true;
    this.paymentSelected = event;
    console.log(this.paymentSelected);
    this.customSpinIsLoading = false;
  }

  payForm: FormGroup = new FormGroup({
    paymentMethod: new FormControl('', [Validators.required]),

    note: new FormControl(''),
  });

  creatOrder(payForm: FormGroup, btn: HTMLButtonElement) {
    this.customSpinIsLoading = true;
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
        this.customSpinIsLoading = false;
      },
      error: err => {
        if (this.paymentSelected == '') {
          this._Toaster.error('Choose Payment Method Please!!');
        } else {
          this.errMsg = err.error.message;
          this._Toaster.error(this.errMsg);
          console.log(err);
        }
        this.customSpinIsLoading = false;
      },
    });
    //}
  }
}
