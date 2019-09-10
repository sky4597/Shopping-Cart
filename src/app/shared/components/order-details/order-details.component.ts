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
  order: Order;
  cart: ShoppingCart;
  cartTotal: number = 0;
  shippingDetails: any ;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrdersByUser(this.userId).valueChanges().subscribe((x) =>{
      this.order = x[0] as Order;
      console.log(this.order);
      let sum = 0;
      this.order.items.forEach(x=>{sum+=x.totalPrice});
      this.cartTotal = sum;
      this.shippingDetails = this.order.shipping;

  });
  }

}


