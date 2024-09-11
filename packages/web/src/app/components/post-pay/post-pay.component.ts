import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-pay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-pay.component.html',
  styleUrls: ['./post-pay.component.css']
})
export class PostPayComponent implements OnInit {
  constructor(
    private route:ActivatedRoute,
  ){}
  orderStatus:string='';
  orderId:any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.orderId = params.get('orderId')
    })
    this.route.queryParams.subscribe(mobPayQuery=>{
      
      this.orderStatus = mobPayQuery['success'];
      console.log(mobPayQuery,'order status', this.orderStatus);
    })
  }

}
