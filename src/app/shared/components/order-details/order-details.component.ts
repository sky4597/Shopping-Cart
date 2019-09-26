import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  userId;
  date;
  order: Order;
  cart: ShoppingCart;
  cartTotal: number = 0;
  shippingDetails: any ;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.date = +this.route.snapshot.paramMap.get('date');
    this.orderService.getOrdersByUser(this.userId).valueChanges().subscribe((x:Order[]) =>{
      this.order = x.filter(y=>y['datePlaced']===this.date)[0]
      console.log(this.order);
      let sum = 0;
      this.order.items.forEach(x=>{sum+=x.totalPrice});
      this.cartTotal = sum;
      this.shippingDetails = this.order.shipping;

  });
  }

}


