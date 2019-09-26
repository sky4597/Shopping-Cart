import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCart;
  cartCount: number = 0;

  constructor(private cartService: ShoppingCartService) { }

   ngOnInit() {
     this.cartService.getPublishedCart().subscribe(x=>{
      this.cart = x;
     });
    this.cartService.getTotalItemCount().subscribe(count=>{
      this.cartCount = count;
    });
  }

  clearCart(){
    this.cartService.clearCart();
  }

}
