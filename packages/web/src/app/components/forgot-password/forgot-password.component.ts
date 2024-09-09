import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(
    private spinner:NgxSpinnerService,
    private _AuthService:AuthService
  ){}
  isLoading:boolean=false;
  successMsg:string ='';
  errMsg:string = '';
  isEmail:boolean=true;
  isPhone:boolean=false;

  forgotPw:FormGroup = new FormGroup({
    email:new FormControl('',Validators.required)
  })
   
  spinnerLoadEmail():void{
    this.spinner.show()
    this.isEmail = true;
    this.isPhone = false;
    this.spinner.hide();
  }

  spinnerLoadPhone():void{
    this.spinner.show()
    
      this.isPhone = true;
      this.isEmail = false;
    
    this.spinner.hide();
  }
  
  sendEmail():void{
    this.isLoading = true;
    this._AuthService.forgotPassword(this.forgotPw.value).subscribe({
      next:(response)=>{
        console.log('response',response);
      },error:(err)=>{
        console.log('error',err);
      }
      
    })
    this.isLoading = false;
  }
}


