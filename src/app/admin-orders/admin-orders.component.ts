import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent{
  order$;

  constructor(orderService: OrderService) {
    this.order$ = orderService.getOrders().valueChanges();
   }

  ngOnInit() {
  }

}
