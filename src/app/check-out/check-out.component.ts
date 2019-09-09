import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  authSubscription: Subscription;
  cartSubscription: Subscription;
  userId: string;

  /**
   *
   */
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    private cartService: ShoppingCartService) {}

  async ngOnInit(){
    let cart$ = this.cartService.getPublishedCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart)
    this.authSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);
    this.cartService.clearCart();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }
}
