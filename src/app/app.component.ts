import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartService } from './shopping-cart.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { map } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(router: Router, auth: AuthService, userService: UserService, private cartService: ShoppingCartService) {
    auth.afAuth.auth.getRedirectResult().then(res => {
      if (res.user) {
        userService.save(res.user);
        router.navigateByUrl(localStorage.getItem("returnUrl"));
      }
    });
  }

  async ngOnInit() {
    (await this.cartService.getCart()).valueChanges()
      .pipe(
        map(x=>{
          if (!x['items'])
          return new ShoppingCart([]);
          else
          return new ShoppingCart(x['items'])
        })
      ).subscribe((cart: ShoppingCart)=>{
        this.cartService.cart.next(cart);
        let shoppingCartItemCount = 0;
        shoppingCartItemCount = cart.totalItemsCount;
        this.cartService.push(shoppingCartItemCount);
      });

  }
}
