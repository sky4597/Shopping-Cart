import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  userId;
  order: Order;
  cart: ShoppingCart;
  cartTotal: number = 0;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrdersByUser(this.userId).valueChanges().subscribe((x) =>{
      this.order = x[0] as Order;
      let sum = 0;
      this.order.items.forEach(x=>{sum+=x.totalPrice});
      this.cartTotal = sum;
  });
  }

}


