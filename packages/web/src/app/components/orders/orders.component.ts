import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  constructor(
    private _UserDataService:UserService,
    private _AuthService:AuthService
  )
  {}
  orders:any=[];
  activeClass ='defaultcolor';
  ngOnInit(): void {
    this._AuthService.decodeUser()
    
    this._UserDataService.getUserOrders(this._AuthService.userInfo.id).subscribe({
      next:(response)=>{
        this.orders = response.data.orders;
        console.log('orders',response);
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  setActiveClass() {
    this.activeClass = 'thirdcolor';
  }
}
