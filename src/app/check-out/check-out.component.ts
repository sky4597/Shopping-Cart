import { Subscription, Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart$: Observable<ShoppingCart>;
  userId: string;

  constructor(
    private cartService: ShoppingCartService) {}

   ngOnInit(){
    this.cart$ = this.cartService.getPublishedCart();
  }




}
