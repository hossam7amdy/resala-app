import { CommonModule } from '@angular/common';
import { ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { UserService } from 'src/app/core/services/user.service';



@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent implements OnInit {

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _CartService: CartService,
    private _Categories:CategoriesService,
    private route:ActivatedRoute,
    private _Renderer:Renderer2,
    private spinner:NgxSpinnerService,
    private UserProfile:UserService
  
  ) {}

  // attributes
  userNameLogged:string='Login';
  userId:any;
  signOut:boolean= false;
  isToken:string|null='';
  categoryList:any=[];

  cartNum: number = 0;
  togglerOpend:boolean=false;

  @ViewChild('navbar') navbarElement!:ElementRef
  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY > 600){
      this._Renderer.setStyle(this.navbarElement.nativeElement,'top',0)
    }else{
      this._Renderer.removeStyle(this.navbarElement.nativeElement,'top')
    }
  }
  

  ngOnInit(): void {

   
    // this.signOut = this._AuthService.signOut;
    this.isToken = localStorage.getItem('etoken');
    if(this.isToken == null || this.isToken == ''){
      this.signOut = false;
    }else{
      
      this._AuthService.decodeUser();
      this.userId = this._AuthService.userInfo?.id;
    }

    this.getUserInfo(this.userId);

    this._CartService.cartNumber.subscribe({
      next: response => {
        console.log('cart number', response);
        this.cartNum = response;
      },error:(err)=>{
        this.cartNum = 0;
        console.log(err);
      }
    });

    // this._AuthService.userNameLogged.subscribe({
    //   next:response=>{
    //     this.userNameLogged = response;
    //     console.log(this.userNameLogged);
    //   },error: err=>{
    //     this.userNameLogged = 'Login';
    //   }
    // })

   


    this._CartService.getCartUser().subscribe({
      next: response => {
        this.cartNum = response.data.totalQuantity;
      },
      error: () => {},
    });

    this._Categories.getCategories().subscribe({
      next:(response)=>{
        this.categoryList = response.data;
      },error:(err)=>{
        console.log(err);
      }
    })

   
  }

  isTogglerOpend():void{
    if(this.togglerOpend == false){
      this.togglerOpend = true
    }else{
      this.togglerOpend = false;
    }
  }

  getUserInfo(userId:any):void{
    this.UserProfile.getUserInfo(userId).subscribe({
      next:(response)=>{
        this._AuthService.userNameLogged = response.data.firstName;
        this.userNameLogged = response.data.firstName;
        this.signOut = true;
        console.log('user name' ,this.userNameLogged);
      },error:(err)=>{
        console.log(err);
        if(err.status == 401 || err.status == 403){
          this.signOut = false;
        }
      }
    })
  }
  
  reloadPage(id:any):void{
  this.spinner.show();
    window.location.replace(`/category/${id}`)
    this.spinner.hide();
   
  }
  

 

  removeTokenSignOut(): void {
    this.signOut = false;
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
    if(this._AuthService.signOut == null){
      this.cartNum = 0;
    }else{
      this.cartNum = this._CartService.cartNumber.value;
    }
    

    this.userNameLogged = 'Login';
  }
}
