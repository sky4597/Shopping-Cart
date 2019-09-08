import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  cartCount: number = 0;

  constructor(private cartService: ShoppingCartService) { }

   ngOnInit() {
    this.cartService.getTotalItemCount().subscribe(count=>{
      this.cartCount = count;
      console.log(count);
    });
  }

}
